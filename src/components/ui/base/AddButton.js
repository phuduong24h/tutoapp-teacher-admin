import { useTranslations } from 'next-intl';
import { IoMdAdd } from 'react-icons/io';

import { Button } from 'components/form';
import { cn } from 'utils';

const AddButton = ({ label, className, ...props }) => {
  const t = useTranslations();

  return (
    <Button className={cn('gap-2', className)} {...props}>
      <IoMdAdd />
      <span>{label || t('common.add')}</span>
    </Button>
  );
};

export default AddButton;
