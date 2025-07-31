import { Spin } from "antd";
import React from "react";
import "@/app/globals.css";

const Loading = () => {
  return (
    <div className="loading">
      <Spin tip="Loading " />
    </div>
  );
};

export default Loading;
