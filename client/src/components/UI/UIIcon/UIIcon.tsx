import React from 'react';
import { IconName, icons } from '/components/UI/UIIcon/index';
import { cnb } from 'cnbuilder';
import styles from './UIIcon.module.css';

type UIIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

const UIIcon = ({ name, size = 20, color = 'currentColor', className }: UIIconProps) => {
  const IconComponent = icons[name];

  return <IconComponent className={cnb(styles.icon, className)} size={size} color={color} />;
};

export default UIIcon;
