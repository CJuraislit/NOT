import React from 'react';
import { cnb } from 'cnbuilder';
import styles from './UIIconButton.module.css';
import UIIcon from '/components/UI/UIIcon/UIIcon';
import { IconName } from '/components/UI/UIIcon';

type UIIconButtonVariant = 'primary' | 'outline';
type UIIconButtonSize = 'small' | 'medium' | 'large';

type UIIconButtonProps = {
  name: IconName;
  variant?: UIIconButtonVariant;
  size?: UIIconButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ICON_SIZE_MAP: Record<UIIconButtonSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

const UIIconButton = ({
  name,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: UIIconButtonProps) => {
  return (
    <button
      className={cnb(styles.btn, styles[`btn--${variant}`], styles[`btn--${size}`], className)}
      {...props}
    >
      <span className={styles.content}>
        <UIIcon name={name} size={ICON_SIZE_MAP[size]} color="currentColor" />
      </span>
    </button>
  );
};

export default UIIconButton;
