export type User = {
  id: number;
  email: string;
  username: string;
  rating: number;
  created_at: string;
  stats: UserStats;
};

export type UserStats = {
  id: number;
  user_id: number;
  completed_art_count: number;
  attempts_used_today: number;
  daily_quota: number;
  last_attempt_reset_at: string;
  total_pixels_placed: number;
};

export type PublicUser = Omit<User, 'email'>;

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
