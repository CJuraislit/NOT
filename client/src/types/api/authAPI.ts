export type AuthResponse = { token: string };

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  role?: 'ADMIN' | 'USER';
};
