"use client";

import { Spin, Table, Typography } from "antd";
import { VendorWithChainName } from "@/app/utils/types";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const { Title } = Typography;

export default function VendorsPage() {
  const [vendors, setVendors] = useState<VendorWithChainName[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await fetch("/api/vendors");
      const data = await res.json();
      setVendors(data);
      setLoading(false);
    };
    fetchVendors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "Coordinates",
      key: "coordinates",
      render: (_: React.ReactNode, record: VendorWithChainName) => {
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
      title: "Chain ID",
      dataIndex: "chain_id",
      key: "chain_id",
    },
    {
      title: "Chain Name",
      dataIndex: "chain_name",
      key: "chain_name",
    },
    {
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
      render: (text: string) =>
        new Date(text).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
  ];

  if (loading) return <Loading />;

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
