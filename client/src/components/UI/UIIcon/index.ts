import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';

export const icons = {
  user: User,
  logout: LogOut,
};

export type IconName = keyof typeof icons;
