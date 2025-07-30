/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Table, Typography, Tag, Tooltip, Switch } from 'antd';
import { users } from '@/app/data/users';
import { UserWithVendors } from '@/app/utils/types';

const { Title } = Typography;

export default function UsersPage() {
  const [data, setData] = useState(users);

  const toggleUserStatus = (userId: number) => {
    setData((prev) =>
      prev.map((user) =>
        user.user_id === userId ? { ...user, is_active: !user.is_active } : user
      )
    );
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Display name',
      dataIndex: 'display_name',
      key: 'display_name',
    },
    {
      title: 'Is active',
      key: 'is_active',
      render: (_: any, record: UserWithVendors) => (
        <Switch
          checked={record.is_active}
          onChange={() => toggleUserStatus(record.user_id)}
        />
      ),
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'List of vendors',
      key: 'vendors',
      render: (_: any, record: UserWithVendors) => (
        <>
          {record.vendors.map(({ vendor_id, vendor_name }) => (
            <Tooltip key={vendor_id} title={`ID: ${vendor_id}`}>
              <Tag style={{ marginBottom: 4, cursor: 'pointer' }}>{vendor_name}</Tag>
            </Tooltip>
          ))}
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Table of Users</Title>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="user_id"
        pagination={false}
      />
    </div>
  );
}
