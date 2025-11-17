import { $host } from '/api/index';
import { AuthResponse, LoginPayload, RegisterPayload } from '/types/api/authAPI';

export const login = async (payload: LoginPayload) => {
  const { data } = await $host.post<AuthResponse>('api/auth/login', payload);
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await $host.post<AuthResponse>('api/auth/registration', payload);
  return data;
};
