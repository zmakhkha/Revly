/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table, Typography, Tag, Tooltip, Switch } from "antd";
import { UserWithVendors } from "@/app/utils/types";

const { Title } = Typography;

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithVendors[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data: UserWithVendors[] = await res.json();
      console.log("Fetched users:", data);
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Display name",
      dataIndex: "display_name",
      key: "display_name",
    },
    {
      title: "Is active",
      key: "is_active",
      render: (_: any, record: UserWithVendors) => (
        <Switch
          checked={record.is_active}
          // onChange={() => toggleUserStatus(record.user_id)}
        />
      ),
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "List of vendors",
      key: "vendors",
      render: (_: any, record: UserWithVendors) => (
        <>
          {record.vendors.map(({ vendor_id, vendor_name }) => (
            <Tooltip key={vendor_id} title={`ID: ${vendor_id}`}>
              <Tag style={{ marginBottom: 4, cursor: "pointer" }}>
                {vendor_name}
              </Tag>
            </Tooltip>
          ))}
        </>
      ),
    },
  ];

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <Title level={2}>Table of Users</Title>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="user_id"
        pagination={false}
      />
    </div>
  );
}
