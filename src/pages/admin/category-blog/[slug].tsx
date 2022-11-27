/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button } from 'antd'
import Link from 'next/link'
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LayoutAdmin from '../../../components/Layout/admin'
import { path } from '../../../constants/path'
import useCateBlog from '../../../hooks/use-cateBlog'
import stylesAdmin from '../../../styles/Admin.module.css'
var slugLibrary = require('slug')

type Props = {}

const EditCateBlog = (props: Props) => {
    const [slugAuto, setSlugAuto] = useState<any>("")
    const [autoRenderIcon, setAutoRenderIcon] = useState("")
    const [autoRenderColorIcon, setAutoRenderColorIcon] = useState("")
    const [autoRenderSizeIcon, setAutoRenderSizeIcon] = useState("")
    let [idType, setIdType] = useState("")

    const { data, detail, editCate, error } = useCateBlog()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const router = useRouter()
    const { slug } = router.query
    
    useEffect(() => {
        const getDetail = async () => {
            // set slug into input value
            setSlugAuto(slug)

            // Get id type by slug
            data?.forEach((data: any) => {
                if (data.slug == slug) {
                    setIdType(data.slug)
                }
            })
            if (idType != "") {
                const data: any = await detail(idType)
                const dataCateBlog = data?.cateBlog;
                setAutoRenderIcon(dataCateBlog.urlIcon)
                setAutoRenderColorIcon(dataCateBlog.colorIcon)
                setAutoRenderSizeIcon(dataCateBlog.sizeIcon)
                reset({ ...dataCateBlog})
            }
        }
        getDetail()
    }, [slug, idType])

    if (error) return <div className="">{error}</div>
    if (!data) return <div>Loading...</div>

    // create render slug auto
    const createSlug = (e: any) => {
        const value = slugLibrary(e.target.value)
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
    const onEdit = async (dataForm: any) => {
        let flag = false
        const dataWithoutSlug = data.filter((item: any) => item.slug != slug)

        dataWithoutSlug?.forEach((item: any) => {
            if (item.slug == slugAuto) {
                flag = true
            }
        })
        if (flag) {
            toast.error("Tên danh mục đã tồn tại")
        } else {
            try {
                const dataInput = {
                    ...dataForm,
                    slug: slugAuto,
                    idSlugUpdate: idType
                }
                await editCate(dataInput)
                router.push("/admin/category-blog")
                toast.success("Chỉnh sửa danh mục thành công")
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
    }
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Danh Mục Bài Viết</Breadcrumb.Item>
                <Breadcrumb.Item>Cập Nhật Danh Mục</Breadcrumb.Item>
            </Breadcrumb>
            <div className="">
                <div className={stylesAdmin['header-top-table']}>
                    <h2 className={stylesAdmin['title-admin']}>Sửa danh mục</h2>
                    <Link href={path.private.categoryBlogRoute}>
                        <a style={{ textDecoration: "underline" }}>Danh sách danh mục </a>
                    </Link>
                </div>
                <form action="" onSubmit={handleSubmit(onEdit)}>
                    <div className={`${stylesAdmin['form-content-section']} ${stylesAdmin['form-content-section--grid']}`}>
                        <div className={stylesAdmin['form-content-col']}>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Tên danh mục
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
                                <span className={stylesAdmin['form__text-error']}>
                                    {errors?.name ? errors?.name.message as string : ""}
                                </span>
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Slug:
                                </label>
                                <span className={`${stylesAdmin['form__input']} ${stylesAdmin['form__input--disable']}`}>{slugAuto}</span>
                            </div>
                            <div className={stylesAdmin['form-input-section']}>
                                <label className={stylesAdmin['form__label']}>
                                    Mã Class Icon
                                </label>
                                <input
                                    onKeyUp={(e) => renderIcon(e)}
                                    {...register('urlIcon')}
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
                                Trạng Thái (0: Ẩn) - (1: Hiện)
                                </label>
                                <input type="number"
                                    {...register('status')}
                                    placeholder="Nhập số 0 hoặc 1"
                                    className={stylesAdmin['form__input']} />
                            </div>
                            <div className={`${stylesAdmin['form-input-section']} ${stylesAdmin['form-input-section--button']}`}>
                                <Button type="primary" htmlType="submit">
                                    Cập Nhật Danh Mục
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
EditCateBlog.Layout = LayoutAdmin

export default EditCateBlog