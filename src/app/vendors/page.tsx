/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Table, Typography } from 'antd';
import { vendors } from '@/app/data/vendors';
import { VendorWithChainName } from '@/app/utils/types';

const { Title } = Typography;

export default function VendorsPage() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'vendor_name',
      key: 'vendor_name',
    },
    {
      title: 'Coordinates',
      key: 'coordinates',
      render: (_: any, record: VendorWithChainName) => {
        const { longitude, latitude } = record;
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        return (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            [{longitude}, {latitude}]
          </a>
        );
      },
    },
    {
      title: 'Chain ID',
      dataIndex: 'chain_id',
      key: 'chain_id',
    },
    {
      title: 'Chain Name',
      dataIndex: 'chain_name',
      key: 'chain_name',
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (text: string) => new Date(text).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    },
  ];

  return (
    <div>
      <Title level={2}>Table of Vendors</Title>

      <Table
        dataSource={vendors}
        columns={columns}
        rowKey="vendor_id"
        pagination={false}
      />
    </div>
  );
}
