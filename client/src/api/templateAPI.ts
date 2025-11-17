import { $authHost } from '/api/index';
import {
  TemplateListItem,
  AttemptPixelPayload,
  AttemptPixelResponse,
  TemplateDetail,
} from '/types/api/templateAPI';

export const getTemplates = async () => {
  const { data } = await $authHost.get<TemplateListItem[]>('api/templates');
  return data;
};

export const getTemplate = async (id: number) => {
  const { data } = await $authHost.get<TemplateDetail>(`api/templates/${id}`);
  return data;
};

export const attemptPixel = async (id: number, payload: AttemptPixelPayload) => {
  const { data } = await $authHost.post<AttemptPixelResponse>(
    `api/templates/${id}/attempts`,
    payload,
  );
  return data;
};
