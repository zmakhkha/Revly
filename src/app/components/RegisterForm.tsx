"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: { display_name: string; email: string }) => {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:8000/users", values);
      message.success("User registered successfully!");
      toast.success("User registered successfully", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("An Error Occued !!", { position: "bottom-center" });
      message.error("Failed to register user");
    } finally {
      setIsSubmitting(false);
    }
  };
  const { Title } = Typography;

  return (
    <div
      style={{
        display: "Flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <Title level={2}>Register new user</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <Form.Item
          label="Display Name"
          name="display_name"
          rules={[{ required: true, message: "Display name is required" }]}
        >
          <Input placeholder="Enter display name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            {
              type: "email",
              message: "Invalid email address",
            },
          ]}
        >
          <Input type="email" placeholder="Enter email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
