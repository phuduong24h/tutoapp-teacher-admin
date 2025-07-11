import { useMemo } from 'react';

import { get } from 'lodash';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Language } from 'components/ui/base';
import { NAME_APP, usePathname } from 'constants/common';
import { HEADER_TITLE } from 'constants/custom';

const Header = () => {
  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations();

  const name = useMemo(() => {
    const isDetail = 'id' in params;
    const subTitle = isDetail ? ` ${params.id}` : '';
    const _pathname = isDetail ? pathname.replace(params.id, ':id') : pathname;

    return `${t(get(HEADER_TITLE, _pathname, 'N/A'))}${subTitle}`;
  }, [pathname]);

  return (
    <div className="z-10 flex items-center justify-between gap-1 bg-white px-6 pb-[10px] pt-4 shadow-md">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">
          {t('common.welcome')}, {NAME_APP} 👋
        </span>
        <span className="text-3xl font-bold">{name}</span>
      </div>
      <Language />
    </div>
  );
};

export default Header;
