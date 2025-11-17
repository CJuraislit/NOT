import React, { forwardRef } from 'react';
import styles from './styles/UIInput.module.css';
import { cnb } from 'cnbuilder';

type UIInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid: boolean;
};

const UIInput = forwardRef<HTMLInputElement, UIInputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          className={cnb(styles.input, className)}
          aria-invalid={invalid || undefined}
          {...props}
        />
      </div>
    );
  },
);

export default UIInput;
