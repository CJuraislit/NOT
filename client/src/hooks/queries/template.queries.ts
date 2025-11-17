import { useQuery } from '@tanstack/react-query';
import { getTemplate, getTemplates } from '/api/templateAPI';

export const useTemplatesQuery = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates,
  });
};

export const useTemplateQuery = (id: number) => {
  return useQuery({
    queryKey: ['template', id],
    queryFn: () => getTemplate(id),
  });
};
