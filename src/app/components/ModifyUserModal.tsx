import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Switch,
  List,
  Button,
  Typography,
  Space,
} from "antd";
import { toast } from "react-toastify";
import { UserWithVendors, Vendor } from "../utils/types";

type Props = {
  open: boolean;
  onClose: () => void;
  user: UserWithVendors | null;
  onUpdate: () => void;
};

export function ModifyUserModal({ open, onClose, user, onUpdate }: Props) {
  const [form] = Form.useForm();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendorIds, setSelectedVendorIds] = useState<number[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        display_name: user.display_name,
        is_active: user.is_active,
      });
      setSelectedVendorIds(user.vendors?.map((v) => v.vendor_id) || []);
    }
    if (open) loadVendors();
  }, [open, user, form]);

  const loadVendors = async () => {
    setLoadingVendors(true);
    try {
      const res = await fetch("/api/vendors");
      if (!res.ok) throw new Error("Failed to fetch vendors");
      const data: Vendor[] = await res.json();
      setVendors(data);
    } catch {
      toast.error("Failed to load vendors");
    } finally {
      setLoadingVendors(false);
    }
  };

  const toggleVendor = (id: number) => {
    setSelectedVendorIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        email: values.email,
        display_name: values.display_name,
        is_active: values.is_active,
        vendor_ids: selectedVendorIds,
      };

      const response = await fetch(`/api/users/${user?.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      toast.success("User updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/users/${user.user_id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      toast.success("User deleted successfully!", {
        position: "bottom-center",
      });
      onUpdate();
      onClose();
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      title="Edit User"
      confirmLoading={deleting}
      footer={[
        <Button key="delete" danger loading={deleting} onClick={handleDelete}>
          Delete User
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="display_name" label="Display Name">
          <Input />
        </Form.Item>
        <Form.Item name="is_active" label="Is Active" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Typography.Title level={5}>Manage Vendor Assignments</Typography.Title>
        <List
          loading={loadingVendors}
          dataSource={vendors}
          renderItem={(vendor) => (
            <List.Item
              actions={[
                <Button
                  key={`btn-${vendor.vendor_id}`}
                  type={
                    selectedVendorIds.includes(vendor.vendor_id)
                      ? "default"
                      : "primary"
                  }
                  onClick={() => toggleVendor(vendor.vendor_id)}
                >
                  {selectedVendorIds.includes(vendor.vendor_id)
                    ? "Remove"
                    : "Add"}
                </Button>,
              ]}
            >
              {vendor.vendor_name || "Unnamed Vendor"}
            </List.Item>
          )}
          style={{ maxHeight: 200, overflowY: "auto", marginTop: 8 }}
        />
      </Form>
    </Modal>
  );
}
