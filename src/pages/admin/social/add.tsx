/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button } from 'antd'
import Link from 'next/link'
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import LayoutAdmin from '../../../components/Layout/admin'
import { path } from '../../../constants/path'
import stylesAdmin from '../../../styles/Admin.module.css'
import useSocial from '../../../hooks/use-social';
var slug = require('slug')

type Props = {}

const AddBlog = (props: Props) => {
    const [slugAuto, setSlugAuto] = useState("")
    const [autoRenderIcon, setAutoRenderIcon] = useState("")
    const [autoRenderColorIcon, setAutoRenderColorIcon] = useState("")
    const [autoRenderSizeIcon, setAutoRenderSizeIcon] = useState("")
    const { data: dataType, create, error } = useSocial()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    if (error) return <div className="">{error}</div>
    if (!dataType) return <div>Loading...</div>

    // create render slug auto
    const createSlug = (e: any) => {
        const value = slug(e.target.value)
        setSlugAuto(value)
    }

    const renderIcon = (e: any) => {
        setAutoRenderIcon(e.target.value)
    }

    const renderColorIcon = (e: any) => {
        setAutoRenderColorIcon(e.target.value)
    }

    const renderSizeIcon = (e: any) => {
        setAutoRenderSizeIcon(e.target.value)
    }

    // submit add
    const onAdd = async (data: any) => {
        try {
            const dataInput = {
                ...data
            }
            await create(dataInput)
            toast.success("Thêm mới Social thành công")
            router.push("/admin/social")
       
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Social</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm Mới Social</Breadcrumb.Item>
            </Breadcrumb>
            <div className="">
                <div className={stylesAdmin['header-top-table']}>
                    <h2 className={stylesAdmin['title-admin']}>Thêm Social</h2>
                    <Link href={path.private.socialRouter}>
                        <a style={{ textDecoration: "underline" }}>Danh sách Social </a>
                    </Link>
                </div>
                <form action="" onSubmit={handleSubmit(onAdd)}>
                    <div className={`${stylesAdmin['form-content-section']} ${stylesAdmin['form-content-section--grid']}`}>
                        <div className={stylesAdmin['form-content-col']}>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Tên Social
                                </label>
                                <input
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
                                <span className={stylesAdmin['form__text-error']}>
                                    {errors?.name ? errors?.name.message as string : ""}
                                </span>
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Mã Class Icon
                                </label>
                                <input
                                    onKeyUp={(e) => renderIcon(e)}
                                    {...register('urlIcon')}
                                    placeholder="Ví dụ: bi bi-card-image"
                                    className={stylesAdmin['form__input']} />
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Mã Màu Icon
                                </label>
                                <input
                                    onKeyUp={(e) => renderColorIcon(e)}
                                    {...register('colorIcon')}
                                    placeholder="Ví dụ: 'blue' hoặc mã màu '#ededed'"
                                    className={stylesAdmin['form__input']} />
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Size Icon
                                </label>
                                <input
                                    onKeyUp={(e) => renderSizeIcon(e)}
                                    {...register('sizeIcon')}
                                    placeholder="Ví dụ: 30px"
                                    className={stylesAdmin['form__input']} />
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Link đến Social
                                </label>
                                <input
                                    {...register('linkTo')}
                                    placeholder="Ví dụ: facebook.com/profile"
                                    className={stylesAdmin['form__input']} />
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                Trạng Thái (0: Ẩn) - (1: Hiện)
                                </label>
                                <input type="number"
                                    {...register('status')}
                                    className={stylesAdmin['form__input']} />
                            </div>
                            <div className={`${stylesAdmin['form-input-section']} ${stylesAdmin['form-input-section--button']}`}>
                                <Button type="primary" htmlType="submit">
                                    Tạo Mới Social
                                </Button>
                            </div>
                        </div>
                        <div className="text-center">
                            <h2>Xem Trước Icon</h2>
                            <div className="Render Icon ">
                                { autoRenderIcon == "" ? <div>Vui lòng nhập mã icon bên cạnh</div>
                                    : <i style={{color: autoRenderColorIcon, fontSize: autoRenderSizeIcon}} className={autoRenderIcon}></i>
                                }
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