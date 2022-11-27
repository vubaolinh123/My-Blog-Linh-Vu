import React from "react";
import { LayoutProps } from "../../models/layout";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";
import "antd/dist/antd.css";
import { Breadcrumb, Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const LayoutEmpty = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default LayoutEmpty;
