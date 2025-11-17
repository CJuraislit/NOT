import React from 'react';
import { cnb } from 'cnbuilder';
import styles from './UIButton.module.css';

type UIButtonVariant = 'primary' | 'outline';
type UIButtonSize = 'small' | 'medium' | 'large';

type UIButtonProps = {
  variant?: UIButtonVariant;
  size?: UIButtonSize;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const UIButton = ({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  ...props
}: UIButtonProps) => {
  return (
    <button
      className={cnb(styles.btn, styles[`btn--${variant}`], styles[`btn--${size}`], className)}
      {...props}
    >
      <span className={styles.content}> {children}</span>
    </button>
  );
};

export default UIButton;
