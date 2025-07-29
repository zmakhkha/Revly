'use client'

import { Menu, Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from '@/app/data/navbar';



const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const elements = menuItems;

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      onClick={(e) => router.push(e.key)}
      style={{ height: '100vh', width: 200 }}
    >
      {elements.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Tooltip title={item.description}>
            {item.title}
          </Tooltip>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Navbar;
