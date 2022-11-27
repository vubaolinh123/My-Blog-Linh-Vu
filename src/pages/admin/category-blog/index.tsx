/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button, Tooltip } from 'antd'
import React, { useEffect } from 'react'
import LayoutAdmin from '../../../components/Layout/admin'
import stylesAdmin from '../../../styles/Admin.module.css'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { ICategoryBlog } from '../../../models/categoryBlog';
import useCateBlog from '../../../hooks/use-cateBlog';
import { path } from '../../../constants/path';

const columns: ColumnsType<ICategoryBlog> = [
    {
        title: '#',
        width: 100,
        dataIndex: 'key',
        sorter: (a: any, b: any) => a.key - b.key,
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
        title: 'Mã Icon',
        dataIndex: 'urlIcon',
    },
    {
        title: 'Icon',
        dataIndex: 'icon',
    },
    {
        title: 'Trạng Thái',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        width: 100,
        dataIndex: 'action',
        key: 'action',
    },
];

const CategoryBlogManager = () => {
    const { data, error, remove } = useCateBlog();
    if (error) return <div className="">{error}</div>
    if (!data) return <div>Loading...</div>
    
    const onDelete = async (slug: string) => {
        await remove(slug)
    }
    const dataCateBlog = data.map((item: any, index: any) => {
        return {
            key: index + 1,
            name: <div className={stylesAdmin['ellipsis']}>
                <Tooltip placement="top" title={item.name}>
                    {item.name}  
                </Tooltip>
            </div>,
            urlIcon: <div className={stylesAdmin['ellipsis']}>
            <Tooltip placement="top" title={item.urlIcon}>
                {item.urlIcon}
            </Tooltip>
            </div>, 
            icon: <i style={{color: item.colorIcon, fontSize: item.sizeIcon}} className={item.urlIcon} ></i>,
            status: (item.status) == 0 ? (<div className="text-2xl ant-tag ant-tag-orange" style={{ textAlign: "center" }}>Ẩn</div>) : 
            (<div className="text-lg ant-tag ant-tag-green" style={{ textAlign: "center" }}>Hiện</div>),
            action:
                <div className={stylesAdmin['btn-action-container']}>
                    <Link href={`${path.private.categoryBlogRoute}/${item.slug}`}>
                        <Tooltip placement="top" title='Chỉnh sửa'>
                            <EditOutlined style={{ fontSize: '20px', color: '#08c' }} />
                        </Tooltip>
                    </Link>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteOutlined style={{ fontSize: '20px', color: '#FF1E00' }} onClick={() => onDelete(item.slug)} />
                    </Tooltip>
                </div >
        }
    })

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Danh Mục Bài Viết</Breadcrumb.Item>
                <Breadcrumb.Item>Danh Sách Danh Mục</Breadcrumb.Item>
            </Breadcrumb>
            <div className="">
                <div className={stylesAdmin['header-top-table']}>
                    <h2 className={stylesAdmin['title-admin']}>Danh mục tin tức </h2>
                    <Link href={path.private.categoryBlogAddRoute}>
                        <Button type="primary" size='large'>Thêm danh mục mới
                        </Button>
                    </Link>
                </div>
                <Table columns={columns} dataSource={dataCateBlog} />
            </div>
        </>
    )
}
CategoryBlogManager.Layout = LayoutAdmin

export default CategoryBlogManager