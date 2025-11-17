import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AttemptPixelPayload, TemplateListItem } from '/types/api/templateAPI';
import { attemptPixel, getTemplate } from '/api/templateAPI';

export const userAttemptPixelMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (coords: AttemptPixelPayload) => attemptPixel(id, coords),
    onSuccess: (data) => {
      if (data.correct) {
        queryClient.setQueryData(
          ['template', id],
          (prev: TemplateListItem): TemplateListItem =>
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
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['template', id], exact: true });
    },
  });
};
