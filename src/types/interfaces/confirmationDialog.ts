export interface ConfirmationDialog extends ConfirmationProps {
  isOpen: boolean;
};

export interface ConfirmationProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};