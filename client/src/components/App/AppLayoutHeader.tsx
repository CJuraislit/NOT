import React from 'react';
import styles from './styles/AppLayoutHeader.module.css';
import UIIconButton from '/components/UI/UIIconButton/UIIconButton';
import { usePixelSelectStore } from '/store/pixelSelcet.store';
import { useAuthStore } from '/store/auth.store';

const AppLayoutHeader = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1>NOT</h1>
        <p>app</p>
      </div>
      <UIIconButton name={'logout'} onClick={logout} />
    </header>
  );
};

export default AppLayoutHeader;
