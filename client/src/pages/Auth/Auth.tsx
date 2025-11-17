import React, { useEffect, useState } from 'react';
import UIInput from '/components/UI/form/UIInput';
import styles from '/pages/Auth/styles/Auth.module.css';
import UIButton from '/components/UI/UIButton/UIButton';
import { useLoginMutation, useRegisterMutation } from '/hooks/mutations/auth.mutations';
import { AxiosError } from 'axios';
import { ServerError, FieldErrors, AuthValues } from '/pages/Auth/types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '/routes/consts';
import { isBlank } from '/utils/utils';

const validate = ({ email, username, password }: AuthValues, isRegister: boolean): FieldErrors => {
  const next: FieldErrors = {};

  if (isBlank(email) || isBlank(password) || (isRegister && isBlank(username))) {
    next.creds = 'All fields required';
    return next;
  }

  if (isRegister && username!.trim().length < 3) {
    next.username = 'Username should be at least 3 characters';
  }
  if (!email!.includes('@')) {
    next.email = 'Invalid email address';
  }
  if (password!.trim().length < 3) {
    next.password = 'Password should be at least 3 characters';
  }

  return next;
};

const mapServerErrors = (err: unknown): FieldErrors => {
  const ax = err as AxiosError<ServerError>;
  const data = ax.response?.data;
  const msg = data?.message;
  const field = data?.meta?.field;

  if (field === 'email') return { email: msg };
  if (field === 'username') return { username: msg };
  if (field === 'email|password') return { creds: msg };
  return { common: msg };
};

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === REGISTER_ROUTE;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [errors, setErrors] = useState<FieldErrors>({});

  const {
    mutateAsync: loginMutate,
    isPending: isLoginPending,
    reset: resetLogin,
  } = useLoginMutation();

  const {
    mutateAsync: registerMutate,
    isPending: isRegisterPending,
    reset: resetRegister,
  } = useRegisterMutation();

  const isLoading = isLoginPending || isRegisterPending;

  useEffect(() => {
    setErrors({});
    resetLogin();
    resetRegister();
  }, [location.pathname, resetLogin, resetRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientErrors = validate({ email, username, password }, isRegister);
    if (Object.keys(clientErrors).length) return setErrors(clientErrors);

    try {
      if (isRegister) {
        await registerMutate({ username, email, password });
      } else {
        await loginMutate({ email, password });
      }
    } catch (err) {
      setErrors(mapServerErrors(err));
    }
  };

  const onFocusField = (k: keyof FieldErrors) => {
    setErrors((p) => ({ ...p, [k]: undefined, common: undefined }));
    resetLogin();
    resetRegister();
  };

  const switchRoute = () => {
    navigate(isRegister ? LOGIN_ROUTE : REGISTER_ROUTE, { replace: true });
  };

  return (
    <div className={styles.authContainer}>
      <p className={styles.header}>{isRegister ? 'Create Account' : 'Welcome'}</p>
      <div className={styles.card}>
        {errors.common && <div className={styles.fieldError}>{errors.common}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <UIInput
                id="username"
                invalid={!!errors.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => onFocusField('username')}
              />
              {errors.username && <div className={styles.fieldError}>{errors.username}</div>}
            </div>
          )}
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <UIInput
              id="email"
              type="email"
              invalid={!!errors.email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email || errors.creds)
                  setErrors((p) => ({
                    ...p,
                    email: undefined,
                    creds: undefined,
                    common: undefined,
                  }));
              }}
              onFocus={() => onFocusField('email')}
            />
            {errors.email && <div className={styles.fieldError}>{errors.email}</div>}
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <UIInput
              id="password"
              type="password"
              invalid={!!errors.password}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password || errors.creds)
                  setErrors((p) => ({
                    ...p,
                    password: undefined,
                    creds: undefined,
                    common: undefined,
                  }));
              }}
              onFocus={() => onFocusField('password')}
            />
            {errors.password && <div className={styles.fieldError}>{errors.password}</div>}
            {errors.creds && <div className={styles.fieldError}>{errors.creds}</div>}
          </div>
          <UIButton type="submit" disabled={isLoading}>
            {isRegister ? 'Create Account' : 'Sign In'}
          </UIButton>
          {isRegister ? (
            <p>
              Go to{' '}
              <Link to={LOGIN_ROUTE} replace className={styles.underlined}>
                sign in
              </Link>
            </p>
          ) : (
            <>
              <p>Not registered yet?</p>
              <Link to={REGISTER_ROUTE} replace className={styles.underlined}>
                Create account!
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
