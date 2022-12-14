/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutAdmin from "../../../components/Layout/admin";
import { path } from "../../../constants/path";
import useBlog from "../../../hooks/use-blog";
import useCateBlog from "../../../hooks/use-cateBlog";
import stylesAdmin from "../../../styles/Admin.module.css";
import useTag from "../../../hooks/use-tag";
import dynamic from "next/dynamic";
// const ReactQuill = dynamic(import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import Editor from "../../../components/admin/Editor/Editor";

var slugRender = require("slug");

type Props = {};

const EditBlog = (props: Props) => {
  const [slugAuto, setSlugAuto] = useState<any>("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [previewSource, setPreviewSource] = useState<any>();
  const [openBoxCate, setOpenBoxCate] = useState(true);
  const [openBoxBlog, setOpenBoxBlog] = useState(true);
  const [valueArrayIdTag, setValueArrayIdTag] = useState<any>([]);
  const [valueArrayIdCate, setValueArrayIdCate] = useState<any>([]);
  let [idBlog, setIdBlog] = useState("");
  const [valueDesc, setValueDesc] = useState("");

  const CLOUDINARY_API: any = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const UPLOAD_PRESETS: any = process.env.NEXT_PUBLIC_UPLOAD_PRESETS;
  const { data: dataBlog, edit, detail } = useBlog();
  const { data: tagBlog, error: errorTag } = useTag();
  const { data: cateBlog, error: errorBlog } = useCateBlog();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const getDetailBlog = async () => {
      setSlugAuto(slug);


        if (slug) {
          let ArrayCateBlog:any = []
          let ArrayTagBlog:any = []

          const dataDetailBlog: any = await detail(slug)
          setPreviewSource(dataDetailBlog.blog.image)
          setValueDesc(dataDetailBlog.blog.desc)
          reset({ ...dataDetailBlog.blog })

        const checkboxTag = document.querySelectorAll(".checkboxTag");
        const checkboxCate = document.querySelectorAll(".checkboxCate");
        if (checkboxTag) {
          checkboxTag.forEach((tag: any) => {
            tagBlog?.forEach((tagCate: any) => {
              dataDetailBlog.blog.tagBlog.forEach((tagPost: any) => {
                if (tagPost._id == tag.value) {
                  tag.checked = true;
                  if (!ArrayTagBlog.includes(tag.value)) {
                    ArrayTagBlog.push(tag.value);
                  }
                }
              });
            });
          });
          setValueArrayIdTag(ArrayTagBlog);
        }
        if (checkboxCate) {
          checkboxCate.forEach((tag: any) => {
            cateBlog?.forEach((Cate: any) => {
              dataDetailBlog.blog.categoryBlog.forEach((CateBlog: any) => {
                if (CateBlog._id == tag.value) {
                  tag.checked = true;
                  if (!ArrayCateBlog.includes(tag.value)) {
                    ArrayCateBlog.push(tag.value);
                  }
                }
              });
            });
          });
          setValueArrayIdCate(ArrayCateBlog);
        }
      }
    };
    getDetailBlog();
  }, [slug]);

  if (errorTag) return <div className="">{errorTag}</div>;
  if (errorBlog) return <div className="">{errorBlog}</div>;
  if (!cateBlog) return <div>Loading...</div>;
  if (!dataBlog) return <div>Loading...</div>;
  if (!tagBlog) return <div>Loading...</div>;


  const formats = [
    'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
  ];

  // create render slug auto
  const createSlug = (e: any) => {
    const value = slugRender(e.target.value);
    setSlugAuto(value);
  };
  const onClickCategory = (e: any) => {
    if (e.target.checked) {
      setValueArrayIdCate([...valueArrayIdCate, e.target.value]);
    } else {
      setValueArrayIdCate(
        valueArrayIdCate.filter((item: any) => item !== e.target.value)
      );
    }
  };
  const onClickTag = (e: any) => {
    if (e.target.checked) {
      setValueArrayIdTag([...valueArrayIdTag, e.target.value]);
    } else {
      setValueArrayIdTag(
        valueArrayIdTag.filter((item: any) => item !== e.target.value)
      );
    }
  };

  const handleChangeImage = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setImage(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //submit add
  const onAdd = async (data: any) => {
    let flag = false;
    // Loại bỏ Slug hiện tại của bài đó để tí nữa duyệt mảng không bị trùng
    const newDataBlogSlub = dataBlog.filter((item: any) => item.slug !== slug);

    newDataBlogSlub?.forEach((item: any) => {
      if (item.slug == slugAuto) {
        flag = true;
      }
    });
    if (flag) {
      toast.error("Tên bài viết đã tồn tại");
    } else {
      if (image == "") {
        const dataBlog = {
          ...data,
          image: previewSource,
          desc: valueDesc,
          slug: slugAuto,
          categoryBlog: valueArrayIdCate,
          tagBlog: valueArrayIdTag,
          idSlubUpdate: slug,
        };
        await edit(dataBlog);
        toast.success("Cập nhật bài viết thành công");
      } else {
        const file = previewSource;
        if (file) {
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESETS);
            const response = await axios.post(CLOUDINARY_API, formData, {
              headers: {
                "Content-Type": "application/form-data",
              },
            });

            const dataBlog = {
              ...data,
              slug: slugAuto,
              image: response.data.url,
              desc: valueDesc,
              categoryBlog: valueArrayIdCate,
              tagBlog: valueArrayIdTag,
              idSlubUpdate: slug,
            };
            await edit(dataBlog);
            toast.success("Cập nhật bài viết thành công");
          } catch (error) {
            toast.error(
              "Đã có lỗi xẩy ra khi Upload Ảnh lên Online. Vui lòng check lại Cloudinary còn dung lượng khả dụng không rồi liên hệ với người quản trị Website"
            );
          }
        }
      }
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link href={path.private.blogRoute}>Bài Viết</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chỉnh Sửa Bài Viết</Breadcrumb.Item>
      </Breadcrumb>
      <div className={stylesAdmin["header-top-table"]}>
        <h2 className={stylesAdmin["title-admin"]}>Chỉnh Sửa bài viết </h2>
        <Link href={path.private.blogRoute}>
          <a style={{ textDecoration: "underline" }}>Danh Sách Bài Viết </a>
        </Link>
      </div>
      <form action="" onSubmit={handleSubmit(onAdd)}>
        <div
          className={`${stylesAdmin["form-content-section"]} ${stylesAdmin["form-content-section--grid"]}`}
        >
          <div className={stylesAdmin["form-content-col"]}>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Tên bài viết</label>
              <input
                onKeyUp={(e) => createSlug(e)}
                {...register("title", {
                  required: {
                    value: true,
                    message: "Yêu cầu nhập thông tin",
                  },
                  minLength: {
                    value: 2,
                    message: "Nhập tối thiểu 2 kí tự",
                  },
                })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {errors?.title ? errors?.title.message as string : ""}
              </span>
            </div>
              <div className={stylesAdmin["form-input-section"]}>
                <label className={stylesAdmin["form__label"]}>Slug:</label>
                <span
                  className={`${stylesAdmin["form__input"]} ${stylesAdmin["form__input--disable"]}`}
                >
                  {slugAuto}
                </span>
              </div>
            <div className={stylesAdmin["form-content--grid-col-2"]}>
              <div className={stylesAdmin["form-input-section"]}>
                <label className={stylesAdmin["form__label"]}>
                  Người Đăng Bài
                </label>
                <input
                  {...register("poster", {
                    required: {
                      value: true,
                      message: "Yêu cầu nhập thông tin",
                    },
                    minLength: {
                      value: 2,
                      message: "Nhập tối thiểu 2 kí tự",
                    },
                  })}
                  className={stylesAdmin["form__input"]}
                />
                <span className={stylesAdmin["form__text-error"]}>
                  {errors?.poster ? errors?.poster.message as string : ""}
                </span>
              </div>
              <div className={stylesAdmin["form-input-section"]}>
                <label className={stylesAdmin["form__label"]}>
                  Tác Giả Bài Viết
                </label>
                <input
                  {...register("author", {
                    required: {
                      value: true,
                      message: "Yêu cầu nhập thông tin",
                    },
                    minLength: {
                      value: 2,
                      message: "Nhập tối thiểu 2 kí tự",
                    },
                  })}
                  className={stylesAdmin["form__input"]}
                />
                <span className={stylesAdmin["form__text-error"]}>
                  {errors?.author ? errors?.author.message as string : ""}
                </span>
              </div>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Mô tả ngắn</label>
              <textarea
                {...register("shortDesc", {
                  required: {
                    value: true,
                    message: "Yêu cầu nhập thông tin",
                  },
                })}
                id=""
                className={stylesAdmin["form__textarea"]}
              ></textarea>
              <span className={stylesAdmin["form__text-error"]}>
                {errors?.shortDesc ? errors?.shortDesc.message as string : ""}
              </span>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <label>Nội dung bài viết</label>
              <div className="">
                <Editor
                  name="ckeditor"
                  onChange={(data: any) => {
                    setValueDesc(data);
                  }}
                  htmlData={valueDesc}
                /> 
              </div>
            </div>
            <div
              className={`${stylesAdmin["form-input-section"]} ${stylesAdmin["form-input-section--button"]}`}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
          <div className={stylesAdmin["form-content-col"]}>
          <div className={stylesAdmin["form-input-section"]}>
                <label className={stylesAdmin["form__label"]}>
                  Trạng Thái (0: Ẩn Bài -- 1: Hiện Bài)
                </label>
                <input
                  type="number"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Yêu cầu nhập trạng thái",
                    },
                  })}
                  className={stylesAdmin["form__input"]}
                />
                <span className={stylesAdmin["form__text-error"]}>
                  {errors?.status ? errors?.status.message as string : ""}
                </span>
              </div>
            <div className={stylesAdmin["form-input-section"]}>
              {previewSource ? (
                <img
                  id="img-preview"
                  src={previewSource}
                  alt=""
                  className={stylesAdmin["form__img"]}
                />
              ) : (
                <img
                  id="img-preview"
                  className={stylesAdmin["form__img"]}
                  src="https://i.imgur.com/MV2djzI.png"
                  alt=""
                />
              )}
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <div className={stylesAdmin["form-upload-section"]}>
                <input
                  type="file"
                  onChange={(e) => handleChangeImage(e)}
                  value={image}
                  className={stylesAdmin["form__input"]}
                />
              </div>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <div className={stylesAdmin["select-btn"]}>
                <span className={stylesAdmin["btn-text"]}>
                  Chọn Thẻ ( Tag )
                </span>
                <span className={stylesAdmin["arrow-dwn"]}>
                  {openBoxBlog ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  )}
                </span>
              </div>
              {openBoxBlog && (
                <ul className={stylesAdmin["list-items"]}>
                  {tagBlog.map((item: any, index: number) => {
                    return (
                      <li key={index + 1} className={stylesAdmin["item"]}>
                        <input
                          className={`checkboxTag ${stylesAdmin["checkbox"]}`}
                          type="checkbox"
                          value={item._id}
                          onClick={(e) => onClickTag(e)}
                        />
                        <span className={stylesAdmin["item-text"]}>
                          {item?.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <div className={stylesAdmin["select-btn"]}>
                <span className={stylesAdmin["btn-text"]}>
                  Chọn Danh Mục Bài Viết
                </span>
                <span className={stylesAdmin["arrow-dwn"]}>
                  {openBoxCate ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  )}
                </span>
              </div>
              {openBoxCate && (
                <ul className={stylesAdmin["list-items"]}>
                  {cateBlog.map((item: any, index: number) => {
                    return (
                      <li
                        key={index + 1}
                        className={stylesAdmin["item"]}
                        onClick={(e) => onClickCategory(e)}
                      >
                        <input
                          className={`checkboxCate ${stylesAdmin["checkbox"]}`}
                          type="checkbox"
                          value={item._id}
                        />
                        <span className={stylesAdmin["item-text"]}>
                          {item?.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

EditBlog.Layout = LayoutAdmin;

export default EditBlog;
