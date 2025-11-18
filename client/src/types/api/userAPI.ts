export type Role = 'USER' | 'ADMIN';

export type User = {
  id: number;
  email: string;
  username: string;
  rating: number;
  created_at: string;
  stats: UserStats;
  role: Role;
};

export type PublicUser = Omit<User, 'email' | 'role'>;

export type UserStats = {
  id: number;
  user_id: number;
  completed_art_count: number;
  attempts_used_today: number;
  daily_quota: number;
  last_attempt_reset_at: string;
  total_pixels_placed: number;
};
