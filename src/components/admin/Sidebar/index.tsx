/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  CalculatorOutlined,
  ChromeOutlined,
  CommentOutlined,
  DashboardOutlined,
  FormOutlined,
  SettingOutlined,
  SnippetsOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { path } from "../../../constants/path";
import useColor from "../../../hooks/useColor";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [infoWeb, setInfoWeb] = useState<any>();
  const { getAllColor } = useColor();
  
  useEffect(() => {
    const getInFoWebsite = async () => {
      const [data]: any = await getAllColor();
      setInfoWeb(data);
    };
    getInFoWebsite();
  }, []);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  type MenuItem = Required<MenuProps>["items"][number];

  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const menuItems: MenuItem[] = [
    getItem(
      <Link href={path.private.rootRoute}>Xem Thống Kê</Link>,
      "1",
      <DashboardOutlined />
    ),
    getItem("Bài Viết", "sub2", <FormOutlined />, [
      getItem(<Link href={path.private.blogRoute}>Danh Sách</Link>, "2"),
      getItem(<Link href={path.private.blogAddRoute}>Tạo Mới</Link>, "3"),
    ]),
    getItem("Danh Mục Bài Viết", "sub3", <SnippetsOutlined />, [
      getItem(
        <Link href={path.private.categoryBlogRoute}>Danh Sách</Link>,
        "4"
      ),
      getItem(
        <Link href={path.private.categoryBlogAddRoute}>Tạo Mới</Link>,
        "5"
      ),
    ]),
    getItem("Thẻ", "sub4", <TagsOutlined />, [
      getItem(<Link href={path.private.tagBlogRouter}>Danh Sách</Link>, "6"),
      getItem(<Link href={path.private.tagBlogAddRoute}>Tạo Mới</Link>, "7"),
    ]),
    getItem("Social", "sub5", <ChromeOutlined />, [
      getItem(<Link href={path.private.socialRouter}>Danh Sách</Link>, "11"),
      getItem(<Link href={path.private.socialAddRouter}>Tạo Mới</Link>, "12"),
    ]),
    getItem(
      <Link href={path.private.commentRouter}>Bình Luận</Link>,
      "0",
      <CommentOutlined />
    ),
    getItem(
      <Link href={path.private.settingRouter}>Cài đặt giao diện</Link>,
      "10",
      <SettingOutlined />
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={styles["logo-container"]}>
        <Link href={path.public.rootRoute}>
          <img className={styles["logo"]} src={infoWeb?.url} alt="" />
        </Link>
        <Link href={path.public.rootRoute}>
          <span className={styles["logo-text"]}>{infoWeb?.text}</span>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
