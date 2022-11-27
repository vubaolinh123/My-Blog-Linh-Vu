/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button, Input, PageHeader, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LayoutAdmin from "../../../components/Layout/admin";
import stylesAdmin from "../../../styles/Admin.module.css";
import { Switch } from "antd";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { IBlog } from "../../../models/blog";
import useBlog from "../../../hooks/use-blog";
import { path } from "../../../constants/path";

const { Search } = Input;

const columns: ColumnsType<IBlog> = [
  {
    title: "#",
    dataIndex: "key",
    sorter: (a: any, b: any) => a.key - b.key,
  },
  {
    title: "Ảnh",
    dataIndex: "img",
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: 250,
  },
  {
    title: "Danh Mục",
    dataIndex: "categoryBlog",
  },
  {
    title: "Thẻ (Tag)",
    dataIndex: "tagBlog",
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
    sorter: (a: any, b: any) => a.status - b.status,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];



const BlogManager = () => {
  const { data, error, remove, searchItem } = useBlog();
  const [resultSearch, setResultSearch] = useState(data);

  if (error) return <div className="">{error}</div>;
  if (!data) return <div>Loading...</div>;

  //search
  const onSearch = async (e: any) => {
    const keyword = e.target.value;
    try {
      const results = await searchItem(keyword.trim());
      setResultSearch(results);
    } catch (error) {
      toast.error("Lỗi tìm kiếm");
    }
  };

  const onDelete = async (slug: string) => {
    await remove(slug);
    toast.success("Xóa thành công");
  };
  let dataToRender = [];

  resultSearch ? (dataToRender = resultSearch) : (dataToRender = data);
  const dataBlog = dataToRender?.map((item: any, index: any) => {
    return {
      key: index + 1,
      name: (
        <div style={{ maxWidth: "100%", wordBreak: "break-word" }}>
          {item.title}
        </div>
      ),
      img: <img src={item.image} height={50} width={100} alt="" />,
      categoryBlog: (
        <div className="">
          {item.categoryBlog.map((item: any, index: number) => {
            return (
              <span className="text-lg ant-tag ant-tag-blue !m-[1px]" key={index}>
               {item.name}
              </span>
            );
          })}
        </div>
      ),
      tagBlog: (
        <div className=""> 
          {item.tagBlog.map((item: any, index: number) => {
            return (
              <span className="text-lg ant-tag ant-tag-blue !m-[1px]" key={index}>
               {item.name}
              </span>
            );
          })}
        </div>
      ),
      status: (item.status) == 0 ? (<div className="text-2xl ant-tag ant-tag-orange" style={{ textAlign: "center" }}>Ẩn</div>) : 
      (<div className="text-lg ant-tag ant-tag-green" style={{ textAlign: "center" }}>Hiện</div>),
      action: (
        <div className={stylesAdmin["btn-action-container"]}>
          <Link href={`${path.private.blogRoute}/${item.slug}`}>
            <Tooltip placement="top" title="Chỉnh sửa">
              <EditOutlined style={{ fontSize: "20px", color: "#08c" }} />
            </Tooltip>
          </Link>
          <Tooltip placement="top" title="Xóa">
            <DeleteOutlined
              style={{ fontSize: "20px", color: "#FF1E00" }}
              onClick={() => onDelete(item.slug)}
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Bài Viết</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách Bài Viết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="">
        <div className={stylesAdmin["header-top-table"]}>
          <h2 className={stylesAdmin["title-admin"]}>Danh sách Bài Viết</h2>
          <div className={stylesAdmin["header-action"]}>
            <Search
              style={{ maxWidth: 400 }}
              placeholder="Tìm kiếm"
              size="large"
              onKeyUp={(e) => onSearch(e)}
            />
            <Link href={path.private.blogAddRoute}>
              <Button type="primary" size="large">
                Thêm Bài Viết
              </Button>
            </Link>
          </div>
        </div>
        <Table columns={columns} dataSource={dataBlog} />
      </div>
    </>
  );
};
BlogManager.Layout = LayoutAdmin;

export default BlogManager;
