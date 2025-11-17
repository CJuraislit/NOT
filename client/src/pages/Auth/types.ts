export type ServerError = {
  message: string;
  meta?: { field?: 'email' | 'username' | 'email|password' };
};

export type FieldErrors = {
  email?: string;
  username?: string;
  password?: string;
  common?: string;
  creds?: string;
};

export type AuthValues = {
  email: string;
  username: string;
  password: string;
};
