'use client'

import { Menu, Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from '@/app/data/navbar';
import "@/app/globals.css";


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
    <Menu className='Navbar'
      mode="inline"
      selectedKeys={[pathname]}
      onClick={(e) => router.push(e.key)}
      items={items}
    />
  );
};

export default Navbar;
