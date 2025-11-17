import Home from '/pages/Home';
import Profile from '/pages/Profile';
import { FRIENDS_ROUTE, HOME_ROUTE, LEADERBOARD_ROUTE, PROFILE_ROUTE } from '/routes/consts';
import Friends from '/pages/Friends';
import Leaderboard from '/pages/Leaderboard';

export const routes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: FRIENDS_ROUTE,
    Component: Friends,
  },
  {
    path: LEADERBOARD_ROUTE,
    Component: Leaderboard,
  },
];
