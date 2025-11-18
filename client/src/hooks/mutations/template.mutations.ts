import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AttemptPixelPayload, TemplateDetail } from '/types/api/templateAPI';
import { attemptPixel } from '/api/templateAPI';
import { usePixelSelectStore } from '/store/pixelSelcet.store';

export const userAttemptPixelMutation = (id?: number) => {
  const queryClient = useQueryClient();
  const clearSelected = usePixelSelectStore((s) => s.clear);

  return useMutation({
    mutationFn: (coords: AttemptPixelPayload) => attemptPixel(id!, coords),
    onSuccess: (data) => {
      if (data.correct) {
        queryClient.setQueryData(
          ['template', id],
          (prev: TemplateDetail): TemplateDetail =>
            prev
              ? {
                  ...prev,
                  solvedCoords: data.solvedCoords,
                  solvedCount: data.solvedCount,
                  isCompleted: data.isCompleted,
                }
              : prev,
        );
      } else {
        queryClient.invalidateQueries({ queryKey: ['template', id], exact: true });
      }
      clearSelected();
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['template', id], exact: true });
    },
  });
};
