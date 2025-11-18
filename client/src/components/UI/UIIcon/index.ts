import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { House } from 'lucide-react';
import { UserPen } from 'lucide-react';

export const icons = {
  user: User,
  logout: LogOut,
  home: House,
  admin: UserPen,
};

export type IconName = keyof typeof icons;
