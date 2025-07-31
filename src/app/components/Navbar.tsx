'use client'

import { Menu, Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from '@/app/data/navbar';


const Navbar = () => {

  const router = useRouter();
  const pathname = usePathname();

  const items = menuItems.map(({ key, icon, title, description }) => ({
    key,
    icon,
    label: (
      <Tooltip title={description} placement="right">
        {title}
      </Tooltip>
    ),
  }));

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      onClick={(e) => router.push(e.key)}
      items={items}
      style={{ height: '100vh', width: 200 }}
    />
  );
};

export default Navbar;
