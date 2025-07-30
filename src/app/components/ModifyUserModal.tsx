/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Modal, Form, Input, Switch } from "antd";
import { useEffect } from "react";
import { UserWithVendors } from "../utils/types";
import { toast } from "react-toastify";

type Props = {
	open: boolean;
	onClose: () => void;
	user: UserWithVendors | null;
	onUpdate: () => void;
};

export function ModifyUserModal({ open, onClose, user, onUpdate }: Props) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (user) {
			form.setFieldsValue({
				email: user.email,
				display_name: user.display_name,
				is_active: user.is_active,
			});
		}
	}, [user, form]);

	const onFinish = async (values: any) => {
		toast.info("Submitting form...");
		try {
			console.log("Submitting values:", user?.user_id);
			const response = await fetch(`/api/users/${user?.user_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			if (!response.ok) {
				throw new Error("Failed to update user++");
			}
			toast.success("User updated successfully!");
			onUpdate();
			onClose();
		} catch (error) {
			toast.error(`Error: ${(error as Error).message}`);
		}
	};

	return (
		<Modal open={open} onCancel={onClose} onOk={() => form.submit()} title="Edit User">
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
			</Form>
		</Modal>
	);
}
