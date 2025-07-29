'use client'
import { MenuItem } from "@/app/utils/types";

import {
  UserOutlined,
  ShopOutlined,
} from '@ant-design/icons';

export const menuItems: MenuItem[] = [
  {
    key: '/vendors',
    title: 'Vendors',
    icon: <ShopOutlined />,
    description: 'View and manage vendors',
  },
  {
    key: '/users',
    title: 'Users',
    icon: <UserOutlined />,
    description: 'Manage users and their permissions',
  },
];