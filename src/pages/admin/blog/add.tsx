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

var slug = require("slug");

type Props = {};

const AddBlog = (props: Props) => {
  const [slugAuto, setSlugAuto] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [previewSource, setPreviewSource] = useState<any>();
  const [openBoxCate, setOpenBoxCate] = useState(false);
  const [openBoxBlog, setOpenBoxBlog] = useState(false);
  const [valueArrayIdTag, setValueArrayIdTag] = useState<any>([]);
  const [valueArrayIdCate, setValueArrayIdCate] = useState<any>([]);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [valueDesc, setValueDesc] = useState("");

  const CLOUDINARY_API: any =
    process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const UPLOAD_PRESETS: any =
    process.env.NEXT_PUBLIC_UPLOAD_PRESETS;

  const { data: dataBlog, create } = useBlog();
  const { data: tagBlog, error: errorTag } = useTag();
  const { data: cateBlog, error: errorBlog } = useCateBlog();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setEditorLoaded(true)
  }, [image]);

  if (errorBlog) return <div className="">{errorTag}</div>;
  if (errorBlog) return <div className="">{errorBlog}</div>;
  if (!cateBlog) return <div>Loading...</div>;
  if (!dataBlog) return <div>Loading...</div>;
  if (!tagBlog) return <div>Loading...</div>;

  // modules cho ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
  ];

  // create render slug auto
  const createSlug = (e: any) => {
    const value = slug(e.target.value);
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
  const handleOpenBoxCategory = () => {
    if (!openBoxCate) {
      setOpenBoxCate(true);
    } else {
      setOpenBoxCate(false);
      setValueArrayIdCate([]);
    }
  };
  const handleOpenBoxBlog = () => {
    if (!openBoxBlog) {
      setOpenBoxBlog(true);
    } else {
      setOpenBoxBlog(false);
      setValueArrayIdTag([]);
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
    dataBlog?.forEach((item: any) => {
      if (item.slug == slugAuto) {
        flag = true;
      }
    });
    if (flag) {
      toast.error("Tên bài viết đã tồn tại");
    } else {
      if (image == "") {
        toast.error("Bạn chưa chọn ảnh");
      } else {
        const file = previewSource;
        if (file) {
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
            image: response.data.url,
            desc: valueDesc,
            categoryBlog: valueArrayIdCate,
            tagBlog: valueArrayIdTag,
          };
          await create(dataBlog);
          toast.success("Thêm bài viết thành công");
          router.push("/admin/blog");
        }
      }
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link href={path.private.blogRoute}>Bài Viết </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thêm bài viết</Breadcrumb.Item>
      </Breadcrumb>
      <div className={stylesAdmin["header-top-table"]}>
        <h2 className={stylesAdmin["title-admin"]}>Thêm bài viết </h2>
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
            <div className={stylesAdmin["form-content--grid-col-2"]}>
              <div className={stylesAdmin["form-input-section"]}>
                <label className={stylesAdmin["form__label"]}>Slug:</label>
                <span
                  className={`${stylesAdmin["form__input"]} ${stylesAdmin["form__input--disable"]}`}
                >
                  {slugAuto}
                </span>
              </div>
             
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
                {/* <ReactQuill
                  theme="snow"
                  value={valueDesc}
                  onChange={setValueDesc}
                  placeholder="Nhập nội dung bài viết"
                  modules={modules}
                  formats={formats}
                /> */}
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
                  className={stylesAdmin["form__input"]}
                  value={image}
                />
              </div>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <div
                className={stylesAdmin["select-btn"]}
                onClick={handleOpenBoxBlog}
              >
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
                          className={stylesAdmin["checkbox"]}
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
              <div
                className={stylesAdmin["select-btn"]}
                onClick={handleOpenBoxCategory}
              >
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
                          className={stylesAdmin["checkbox"]}
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

AddBlog.Layout = LayoutAdmin;

export default AddBlog;
