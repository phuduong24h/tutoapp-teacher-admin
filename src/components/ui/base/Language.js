'use client';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Button, MenuProps } from 'antd';
import { useLocale } from 'next-intl';

import { useRouter, usePathname } from 'constants/common';

const languages = {
  en: { label: 'English', flag: '🇺🇸' },
  vi: { label: 'Tiếng Việt', flag: '🇻🇳' }
};

export default function Language() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChangeLocale = targetLocale => {
    router.replace(pathname, { locale: targetLocale });
  };

  const items = Object.entries(languages).map(([key, { label, flag }]) => ({
    key,
    label: (
      <div onClick={() => handleChangeLocale(key)} className="flex items-center gap-2" aria-hidden>
        <span>{flag}</span>
        <span>{label}</span>
      </div>
    )
  }));

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button className="flex items-center gap-2 border-none" component="div">
        <span>{languages[locale]?.flag}</span>
        <span className="capitalize">{locale}</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
