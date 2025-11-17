export interface DecodedUser {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export type Roles = 'USER' | 'ADMIN';
