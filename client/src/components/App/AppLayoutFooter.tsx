import React from 'react';
import styles from './styles/AppLayoutFooter.module.css';
import UIIconButton from '/components/UI/UIIconButton/UIIconButton';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, HOME_ROUTE } from '/routes/consts';
import { useMyProfileQuery } from '/hooks/queries/user.queries';

const AppLayoutFooter = () => {
  const { data: me } = useMyProfileQuery();
  const isAdmin = me?.role === 'ADMIN';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <Link to={HOME_ROUTE}>
          <UIIconButton name={'home'} />
        </Link>
        {isAdmin && (
          <Link to={ADMIN_ROUTE}>
            <UIIconButton name={'admin'} />
          </Link>
        )}
      </div>
    </footer>
  );
};

export default AppLayoutFooter;
