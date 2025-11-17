import { Response, NextFunction } from 'express';
import { Template } from '../models';
import ApiError from '../error/ApiError';
import { AuthRequest } from '../types/AuthRequest';

export const createTemplate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, width, height, data } = req.body;
    const createdBy = req.user.id;

    if (!name || !width || !height || !Array.isArray(data)) {
      return next(ApiError.badRequest('Incorrect template structure'));
    }

    const template = await Template.create({
      name,
      description,
      width,
      height,
      data,
      created_by: createdBy,
      is_active: false,
    });

    return res.status(201).json(template);
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

export const updateTemplate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, width, height, data } = req.body;

    const template = await Template.findByPk(id);
    if (!template) return next(ApiError.badRequest('Template not found'));

    if (template.is_active) {
      return next(ApiError.badRequest('Нельзя редактировать опубликованный шаблон'));
    }

    await template.update({
      name: name ?? template.name,
      description: description ?? template.description,
      width: width ?? template.width,
      height: height ?? template.height,
      data: data ?? template.data,
    });

    return res.json(template);
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

export const publishTemplate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const template = await Template.findByPk(id);
    if (!template) return next(ApiError.badRequest('Template not found'));

    if (template.is_active) return next(ApiError.badRequest('Template is already active'));

    await template.update({ is_active: true });

    return res.json({ message: 'Template published successfully', id: template.id });
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

export const unpublishTemplate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const template = await Template.findByPk(id);
    if (!template) return next(ApiError.badRequest('Template not found'));

    if (!template.is_active) return next(ApiError.badRequest('Template is already inactive'));

    await template.update({ is_active: false });

    return res.json({ message: 'Template unpublished successfully', id: template.id });
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
