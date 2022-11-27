/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button } from 'antd'
import Link from 'next/link'
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LayoutAdmin from '../../../components/Layout/admin'
import { path } from '../../../constants/path'
import { ITag } from '../../../models/tag';
import useTag from '../../../hooks/use-tag';
import stylesAdmin from '../../../styles/Admin.module.css'
var slugLibrary = require('slug')

type Props = {}

const EditCateBlog = (props: Props) => {
    const [slugAuto, setSlugAuto] = useState<any>("")
    let [idType, setIdType] = useState("")

    const { data, detail, editTag, error } = useTag()

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
                // báo lỗi đỏ không phải l
                const dataCateBlog = data.tag;
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
            toast.error("Tên thẻ này đã tồn tại")
        } else {
            try {
                const dataInput = {
                    ...dataForm,
                    slug: slugAuto,
                    idSlugUpdate: idType
                }
                await editTag(dataInput)
                toast.success("Chỉnh sửa thẻ thành công")
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
    }
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Danh Mục Thẻ</Breadcrumb.Item>
                <Breadcrumb.Item>Cập Nhật Thẻ</Breadcrumb.Item>
            </Breadcrumb>
            <div className="">
                <div className={stylesAdmin['header-top-table']}>
                    <h2 className={stylesAdmin['title-admin']}>Sửa Thẻ</h2>
                    <Link href={path.private.tagBlogRouter}>
                        <a style={{ textDecoration: "underline" }}>Danh sách Thẻ </a>
                    </Link>
                </div>
                <form action="" onSubmit={handleSubmit(onEdit)}>
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
EditCateBlog.Layout = LayoutAdmin

export default EditCateBlog