/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table, Typography, Tag, Tooltip, Switch } from "antd";
import { UserWithVendors } from "@/app/utils/types";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const { Title } = Typography;

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithVendors[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data: UserWithVendors[] = await res.json();
      setUsers(data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      dataIndex: "is_active",
      key: "is_active",
      render: (_: any, record: UserWithVendors) => {
        const handleToggle = async (checked: boolean) => {
          try {
            const res = await fetch(`/api/users/${record.user_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                is_active: checked,
              }),
            });

            if (!res.ok) throw new Error("Failed to update user");

            toast.success(
              `User ${checked ? "activated" : "deactivated"} successfully.`, {position: "bottom-center"}
            );
              fetchUsers();

          } catch (error) {
            toast.error("Error updating user.");
            console.error(error);
          }
        };

        return <Switch checked={record.is_active} onChange={handleToggle} />;
      },
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

  if (loading) return <Loading />;

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
