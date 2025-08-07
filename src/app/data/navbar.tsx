'use client'
import { MenuItem } from "@/app/utils/types";

import {
  UserOutlined,
  ShopOutlined,
  UserAddOutlined,
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
  {
    key: '/register',
    title: 'Register',
    icon: <UserAddOutlined />,
    description: 'Create a new user account',
  },
  
];