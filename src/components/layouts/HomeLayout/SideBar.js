import { useMemo } from 'react';

import { Menu } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FaHome } from 'react-icons/fa';

import { Images } from 'assets';
import { Language } from 'components/ui/base';
import { usePathname } from 'constants/common';
import { Routes } from 'routes';

import styles from './styles.module.scss';

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const MENU_LAYOUT = [
    {
      key: Routes.TRANG_CHU,
      icon: <FaHome />,
      label: t('home.home')
    }
  ];

  const defaultSelectedKeys = useMemo(() => {
    const pathNameArr = pathname?.split?.('/');
    if (pathNameArr?.length > 2) {
      return [pathNameArr?.slice?.(0, -1)?.join('/'), pathname];
    }
    return [pathname];
  }, [pathname]);

  const onSelect = value => {
    if (value?.key !== pathname) {
      router.push(value?.key);
    }
  };

  return (
    <div className="flex h-full flex-col bg-primary text-text-on-primary">
      <div className="sticky top-0 z-10 mx-4 flex items-end gap-3 border-b border-white py-6">
        <Image src={Images.logo} alt="logo" width={34} height={44} />
        <div className="">
          <p className="text-lg font-semibold">TutoApp</p>
          <p className="text-xs">{t('common.manage')}</p>
        </div>
      </div>
      <div className={styles.menu}>
        <Menu
          className={'w-full bg-primary text-text-on-primary'}
          items={MENU_LAYOUT}
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          selectedKeys={defaultSelectedKeys}
          onClick={onSelect}
        />
      </div>
    </div>
  );
};

export default SideBar;
