/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Switch, List, Button, Typography } from "antd";
import { toast } from "react-toastify";
import type { Vendor } from "@/app/utils/types";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
};

export default function UserModal({ isOpen, onClose, onUserCreated }: UserModalProps) {
  const [form] = Form.useForm();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendorIds, setSelectedVendorIds] = useState<number[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadVendors();
      form.resetFields();
      setSelectedVendorIds([]);
    }
  }, [isOpen]);

  async function loadVendors() {
    setLoadingVendors(true);
    try {
      const res = await fetch("/api/vendors");
      if (!res.ok) throw new Error("Failed to fetch vendors");
      const data: Vendor[] = await res.json();
      setVendors(data);
    } catch (error) {
      toast.error("Failed to load vendors");
    } finally {
      setLoadingVendors(false);
    }
  }

  const toggleVendor = (id: number) => {
    setSelectedVendorIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        email: values.email,
        display_name: values.display_name,
        is_active: values.is_active,
        vendor_ids: selectedVendorIds,
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${errorText || "Failed to create user."}`);
      }

      // Success toast
      toast.success(" User created successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      onClose();
      onUserCreated?.();
    } catch (error: string | "Error" | any) {
      const errorMessage = error?.message || "Unknown error occurred";
      
      // Error toast
      toast.error(` ${errorMessage}`, {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Modal
      title="Add New User"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Create User"
      cancelText="Cancel"
      // okButtonProps={{ disabled: loadingVendors }}
    >
      <Form form={form} layout="vertical" initialValues={{ is_active: true }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item label="Display Name" name="display_name">
          <Input placeholder="Enter display name (optional)" />
        </Form.Item>

        <Form.Item label="Is Active" name="is_active" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>

        <Typography.Title level={5}>Assign Vendors</Typography.Title>
        <List
          loading={loadingVendors}
          dataSource={vendors}
          renderItem={(vendor) => (
            <List.Item
              actions={[
                <Button
                  type={selectedVendorIds.includes(vendor.vendor_id) ? "default" : "primary"}
                  onClick={() => toggleVendor(vendor.vendor_id)}
                  key="assign-btn"
                >
                  {selectedVendorIds.includes(vendor.vendor_id) ? "Remove" : "Add"}
                </Button>,
              ]}
            >
              { vendor.vendor_name || "Unnamed Vendor"}
            </List.Item>
          )}
          style={{ maxHeight: 200, overflowY: "auto", marginTop: 8 }}
        />
      </Form>
    </Modal>
  );
}