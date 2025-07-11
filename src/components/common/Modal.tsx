'use client';

import { Modal as ModalAntd, ModalProps } from 'antd';
import { useTranslations } from 'next-intl';

import { Button } from 'components/form';

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-3 flex flex-col gap-4 py-4">{children}</div>;
};

interface FooterProps {
  loading: boolean;
  disabled?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  cancelLabel?: string;
  submitLabel?: string;
}

const Footer = ({ loading, disabled, onSubmit, onCancel, cancelLabel, submitLabel }: FooterProps) => {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>
        {cancelLabel || t('common.cancel')}
      </Button>
      <Button type="submit" onSubmit={onSubmit} isLoading={loading} disabled={disabled}>
        {submitLabel || t('common.submit')}
      </Button>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  return <ModalAntd footer={null} {...props} />;
};

Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
