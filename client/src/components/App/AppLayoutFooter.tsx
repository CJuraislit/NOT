import React from 'react';
import styles from './styles/AppLayoutFooter.module.css';
import UIIconButton from '/components/UI/UIIconButton/UIIconButton';

const AppLayoutFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.headerContainer}>
        <UIIconButton name={'user'} />
      </div>
    </footer>
  );
};

export default AppLayoutFooter;
