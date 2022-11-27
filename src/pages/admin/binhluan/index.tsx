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
import useBlog from '../../../hooks/use-blog';
import useComment from '../../../hooks/useComment';
import { path } from '../../../constants/path';

const columns: ColumnsType<ICategoryBlog> = [
    {
        title: '#',
        width: 100,
        dataIndex: 'key',
        sorter: (a: any, b: any) => a.key - b.key,
    },
    {
        title: 'Tên Bài Viết',
        dataIndex: 'nameBlog',
    },
    {
        title: 'Tên Người Gửi',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Nội Dung',
        dataIndex: 'content',
    },
    {
        title: 'Trạng Thái',
        dataIndex: 'status',
    },
    {
        title: 'Hành Động',
        width: 100,
        dataIndex: 'action',
        key: 'action',
    },
];

const Comments = () => {
    const { data, error, remove, editOpen, editClose } = useComment();
    if (error) return <div className="">{error}</div>
    if (!data) return <div>Loading...</div>
    
    const onDelete = async (id: number) => {
        await remove(id)
    }

    const onUpdateStatusOpen = async (id: number) => {
        await editOpen(id)
    }

    const onUpdateStatusClose = async (id: number) => {
        await editClose(id)
    }

    const dataCommentBlog = data.map((item: any, index: any) => {
        return {
            key: index + 1,
            nameBlog: <div className={stylesAdmin['ellipsis']}>
                <Tooltip placement="top" title={item.Blog?.title}>
                    {item.Blog?.title}
                </Tooltip>
            </div>,
            name: <div className={stylesAdmin['ellipsis']}>
            <Tooltip placement="top" title={item.name}>
                {item.name}
            </Tooltip>
            </div>,
            email: <div className={stylesAdmin['ellipsis']}>
            <Tooltip placement="top" title={item.email}>
                {item.email}
            </Tooltip>
            </div>,
            content: <div className={stylesAdmin['ellipsis']}>
            <Tooltip placement="top" title={item.content}>
                {item.content}
            </Tooltip>
            </div>,
            status: item.status == 0  ? <div className="ant-tag ant-tag-orange">Ẩn</div>
            : <div className="ant-tag ant-tag-green">Hiện</div>
            ,
            action:
                <div className={stylesAdmin['btn-action-container']}>
                    <Tooltip placement="top" title='Sửa Trạng Thái'>
                        {item.status == 0 ?  <EditOutlined style={{ fontSize: '20px', color: '#08c' }} onClick={() => onUpdateStatusOpen(item._id)}/>
                        : <EditOutlined style={{ fontSize: '20px', color: '#08c' }} onClick={() => onUpdateStatusClose(item._id)}/> }
                        
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa Bình Luận">
                        <DeleteOutlined style={{ fontSize: '20px', color: '#FF1E00' }} onClick={() => onDelete(item._id)} />
                    </Tooltip>
                </div >
        }
    })

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Bình Luận</Breadcrumb.Item>
                <Breadcrumb.Item>Danh Sách Bình Luận</Breadcrumb.Item>
            </Breadcrumb>
            <div className="">
                <div className={stylesAdmin['header-top-table']}>
                    <h2 className={stylesAdmin['title-admin']}>Danh Sách Bình Luận</h2>
                </div>
                <Table columns={columns} dataSource={dataCommentBlog} />
            </div>
        </>
    )
}
Comments.Layout = LayoutAdmin

export default Comments