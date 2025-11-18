import { ReactNode } from 'react';

export type UiModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  showCloseButton?: boolean;
};
