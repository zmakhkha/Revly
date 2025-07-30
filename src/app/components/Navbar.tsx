'use client'

import { Menu, Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from '@/app/data/navbar';
import { useEffect } from 'react';


const Navbar = () => {

  const router = useRouter();
  const pathname = usePathname();

  // Map menuItems into the shape expected by Menu's items prop
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
      items={items} // use items instead of children
      style={{ height: '100vh', width: 200 }}
    />
  );
};

export default Navbar;
