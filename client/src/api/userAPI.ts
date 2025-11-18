import { $authHost } from '/api/index';
import { User } from '/types/api/userAPI';

export const getMyProfile = async () => {
  const { data } = await $authHost.get<User>('api/user/me');
  return data;
};
