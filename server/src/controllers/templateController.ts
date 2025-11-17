import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { Template, UserProgress } from '../models';
import ApiError from '../error/ApiError';

export const getAllWithProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const templates = await Template.findAll({
      where: { is_active: true },
      attributes: ['id', 'name', 'data'],
      include: [
        {
          model: UserProgress,
          as: 'progress',
          required: false,
          where: { user_id: userId },
          attributes: ['solved_count', 'is_completed'],
        },
      ],
    });

    const result = templates.map((template) => {
      const progress = template.progress?.[0];
      const solvedCount = progress?.solved_count ?? 0;
      const isCompleted = progress?.is_completed ?? false;
      const totalCount = template.data.length;

      return {
        id: template.id,
        name: template.name,
        width: template.width,
        height: template.height,
        totalCount,
        solvedCount,
        isCompleted,
      };
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return next(ApiError.badRequest(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};

export const getOneWithProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const template = await Template.findOne({
      where: { id: id, is_active: true },
      attributes: ['id', 'name', 'description', 'width', 'height', 'data'],
      include: [
        {
          model: UserProgress,
          as: 'progress',
          required: false,
          where: { user_id: userId },
          attributes: ['solved_count', 'solved_coords', 'is_completed'],
        },
      ],
    });

    if (!template) return next(ApiError.badRequest('Template not found.'));

    const progress = template.progress?.[0];
    const solvedCount = progress?.solved_count;
    const solvedCoords = progress?.solved_coords ?? [];
    const isCompleted = progress?.is_completed ?? false;
    const totalCount = template.data.length;

    return res.json({
      id: template.id,
      name: template.name,
      description: template.description,
      width: template.width,
      height: template.height,
      solvedCount,
      totalCount,
      solvedCoords,
      isCompleted,
    });
  } catch (error) {
    if (error instanceof Error) {
      return next(ApiError.badRequest(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};

export const attempt = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { x, y } = req.body;

    const template = await Template.findByPk(id);
    if (!template || !template.is_active) return next(ApiError.badRequest('Template not found.'));

    const correctCoords = template.data;
    const isCorrect = correctCoords.some(([cx, cy]) => cx === x && cy === y);

    let progress = await UserProgress.findOne({
      where: { user_id: userId, template_id: id },
    });

    if (!progress) {
      progress = await UserProgress.create({
        user_id: userId,
        template_id: template.id,
      });
    }

    if (isCorrect && !progress.solved_coords.some(([cx, cy]) => cx === x && cy === y)) {
      const solved_coords = [...progress.solved_coords, [x, y]];
      const solved_count = solved_coords.length;
      const is_completed = solved_count >= correctCoords.length;

      await progress.update({ solved_coords, solved_count, is_completed });
    }

    return res.json({
      correct: isCorrect,
      solvedCount: progress.solved_count,
      solvedCoords: progress.solved_coords,
      isCompleted: progress.is_completed,
    });
  } catch (error) {
    if (error instanceof Error) {
      return next(ApiError.badRequest(error.message));
    }
    if (error instanceof Error) {
      return next(ApiError.internal(error.message));
    }
    return next(ApiError.badRequest('Unexpected error'));
  }
};
