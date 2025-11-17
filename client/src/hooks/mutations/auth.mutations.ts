import { useAuthStore } from '/store/auth.store';
import { useMutation } from '@tanstack/react-query';
import { login, register } from '/api/authAPI';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '/routes/consts';

export const useLoginMutation = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      setToken(data.token);
      navigate(HOME_ROUTE, { replace: true });
    },
  });
};

export const useRegisterMutation = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
      setToken(data.token);
      navigate(HOME_ROUTE, { replace: true });
    },
  });
};
