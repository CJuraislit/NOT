import React from 'react';
import { UiModalProps } from '/components/UI/UIModal/types';
import styles from './UiModal.module.css';
import { createPortal } from 'react-dom';
import UIIconButton from '/components/UI/UIIconButton/UIIconButton';

const UiModal = (props: UiModalProps) => {
  const { isOpen, onClose, children, title, showCloseButton = true } = props;

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {(title || showCloseButton) && (
          <div className={styles.modalHeader}>
            {title && <div className={styles.title}>{title}</div>}
            {showCloseButton && (
              <UIIconButton name={'logout'} onClick={onClose} color={'#141412'} />
            )}
          </div>
        )}
        <div className={styles.modalContainer}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default UiModal;
