import React from 'react';
import styles from './styles/AppLayoutHeader.module.css';
import UIIconButton from '/components/UI/UIIconButton/UIIconButton';
import { useAuthStore } from '/store/auth.store';
import { useQueryClient } from '@tanstack/react-query';

const AppLayoutHeader = () => {
  const logoutStore = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logoutStore();
    queryClient.clear();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1>NOT</h1>
        <p>app</p>
      </div>
      <UIIconButton name={'logout'} onClick={handleLogout} />
    </header>
  );
};

export default AppLayoutHeader;
