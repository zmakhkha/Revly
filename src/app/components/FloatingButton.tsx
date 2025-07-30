import React from "react";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

interface FloatingButtonProps {
	onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
	return (
		<div className="floating-button-container">
			<Button type="primary" shape="circle" size="large" onClick={onClick} icon={<UserAddOutlined />} />
		</div>
	);
}
