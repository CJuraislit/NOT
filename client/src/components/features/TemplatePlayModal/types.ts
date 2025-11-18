import { TemplateDetail } from '/types/api/templateAPI';

export type TemplatePlayModalProps = {
  open: boolean;
  onClose: () => void;
  template: TemplateDetail;
};
