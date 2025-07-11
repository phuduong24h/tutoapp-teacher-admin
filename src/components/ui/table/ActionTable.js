'use client';

import { Popconfirm } from 'antd';
import { useTranslations } from 'next-intl';

const ActionTable = ({ onConfirmDelete, hideEdit, onEdit }) => {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-center gap-2">
      <Popconfirm
        placement="topRight"
        description={t('common.sure_delete')}
        icon={null}
        okText={t('common.ok')}
        cancelText={t('common.cancel')}
        onConfirm={onConfirmDelete}>
        <span className="text-state-accent">{t('common.delete')}</span>
      </Popconfirm>
      {!hideEdit && <div className="h-3 w-px bg-border-primary" />}
      {!hideEdit && (
        <span className="text-state-accent" onClick={onEdit} aria-hidden>
          {t('common.edit')}
        </span>
      )}
    </div>
  );
};

export default ActionTable;
