/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button } from 'antd'
import Link from 'next/link'
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import LayoutAdmin from '../../../components/Layout/admin'
import { path } from '../../../constants/path'
import { ITag } from '../../../models/tag';
import useTag from '../../../hooks/use-tag';
import stylesAdmin from '../../../styles/Admin.module.css'
var slug = require('slug')

type Props = {}

const AddBlog = (props: Props) => {
    const [slugAuto, setSlugAuto] = useState("")
    const { data: dataType, create, error } = useTag()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    if (error) return <div className="">{error}</div>
    if (!dataType) return <div>Loading...</div>

    // create render slug auto
    const createSlug = (e: any) => {
        const value = slug(e.target.value)
        setSlugAuto(value)
    }

    // submit add
    const onAdd = async (data: any) => {
        let flag = false
        dataType?.forEach((item: any) => {
            if (item.slug == slugAuto) {
                flag = true
            }
        })
        if (flag) {
            toast.error("Tên thẻ đã tồn tại")
        } else {
            try {
                const dataInput = {
                    ...data
                }
                await create(dataInput)
                router.push(path.private.tagBlogRouter)
            } catch (error) {
                toast.error("Không thể lưu")
            }
           
        }
    }

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Danh Mục Thẻ</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm Mới Thẻ</Breadcrumb.Item>
            </Breadcrumb>
            <div className="">
                <div className={stylesAdmin['header-top-table']}>
                    <h2 className={stylesAdmin['title-admin']}>Thêm mới thẻ</h2>
                    <Link href={path.private.tagBlogRouter}>
                        <a style={{ textDecoration: "underline" }}>Danh sách thẻ </a>
                    </Link>
                </div>
                <form action="" onSubmit={handleSubmit(onAdd)}>
                    <div className={`${stylesAdmin['form-content-section']} ${stylesAdmin['form-content-section--grid']}`}>
                        <div className={stylesAdmin['form-content-col']}>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Tên Thẻ
                                </label>
                                <input
                                    onKeyUp={(e) => createSlug(e)}
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: "Yêu cầu nhập thông tin"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Nhập tối thiểu 2 kí tự"
                                        }
                                    })}
                                    className={stylesAdmin['form__input']} />
                                <span className={stylesAdmin['form__text-error']}>{errors?.name ? errors?.name.message as string : ""}</span>
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Slug:
                                </label>
                                <span className={`${stylesAdmin['form__input']} ${stylesAdmin['form__input--disable']}`}>{slugAuto}</span>
                            </div>
                            <div className={`${stylesAdmin['form-input-section']} ${stylesAdmin['form-input-section--button']}`}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                {/* <Button htmlType="reset">
                                    Reset
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
AddBlog.Layout = LayoutAdmin

export default AddBlog