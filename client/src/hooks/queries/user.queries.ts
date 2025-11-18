import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '/api/userAPI';
import { useAuthStore } from '/store/auth.store';

export const useMyProfileQuery = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['me'],
    queryFn: getMyProfile,
    enabled: !!token,
  });
};
