/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { read as readBlog, relatedBlog } from "../api/blog";
import Category from "../components/client/PageContent/Components/Category";
import InfoPost from "../components/client/PageContent/Components/InfoPost";
import TagList from "../components/client/PageContent/Components/TagList";
import PageHeader from "../components/client/PageHeader";
import HeadMeta from "../components/Meta";
import useComment from "../hooks/useComment";
import styles from "../styles/PageDetail.module.css";
import { formatDateTime } from "../utils/formatDate";

type DetailProps = {
  dataDetailBlog: any;
  comments: any;
  related: any;
};

const PageContentDetail: NextPage<DetailProps> = ({
  dataDetailBlog,
  comments,
  related,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<any>();
  const [sendSuccess, setSendSuccess] = useState(false)

  const {add} = useComment()
  const onSubmit = async (data: any) => {
    try {
      await add({...data, Blog: dataDetailBlog._id})
      setSendSuccess(true)
      reset({
        content: "",
        name: "",
        email: ""
      })
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  };

  useEffect(()=>{
    
  },[])

  return (
    <div className={styles["detail-page"]}>
        <HeadMeta title={dataDetailBlog.title}/>
      <PageHeader title={dataDetailBlog.title} />
      <div className={styles["detail-content-section"]}>
        <div className={styles["detail-content-img"]}>
          <img
            className={styles["detail-content__img"]}
            src={dataDetailBlog.image}
            alt=""
          />
        </div>
        <div className="">
          <div className={styles["detail-content-info"]}>
            <InfoPost date={dataDetailBlog.createdAt} author={dataDetailBlog.author} />
          </div>
          <p className={styles["detail-content__desc-short"]}>
            {dataDetailBlog.shortDesc}
          </p>
          <div className={styles["detail-content-line"]}></div>
          <div className={styles["detail-content-line"]}></div>
          <div className={styles["detail-content"]} dangerouslySetInnerHTML={{ __html: dataDetailBlog.desc }}></div>
          <div className={styles["detail-content-info-bottom"]}>
            <Category categoryName={dataDetailBlog.categoryBlog} />
            <TagList tags={dataDetailBlog.tagBlog} />
          </div>
          <div className={styles["related-posts"]}>
            <h2 className={styles["related-posts__title-section"]}>
              Bài viết liên quan
            </h2>
            {related.map((item: any, index: any) => (
              <h3 key={index} className={styles["related-post__title"]}>
                <Link href={item.slug}>
                  <a
                    href={item.slug}
                    className={styles["related-post__title-link"]}
                  >
                    {item.title}
                  </a>
                </Link>
              </h3>
            ))}
          </div>
          <div className={styles["detail-content-comments"]}>
            <h4 className={styles["detail-content__title-section"]}>
              Bình luận
            </h4>
            {comments.length == 0
              ? "Chưa có bình luận!"
              : comments.map((item: any, index: any) => (
                  <div
                    key={index}
                    className={styles["detail-content-comment-item"]}
                  >
                    <img
                      className={styles["detail-content-comment-item__img"]}
                      src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg"
                      alt=""
                    />
                    <div className="">
                      <div
                        className={styles["detail-content-comment-item-text"]}
                      >
                        <span
                          className={styles["detail-content-comment-item-name"]}
                        >
                          {item.name}
                        </span>
                        <span
                          className={
                            styles["detail-content-comment-item-datetime"]
                          }
                        >
                          {formatDateTime(item.createdAt)}
                        </span>
                        <p
                          className={
                            styles["detail-content-comment-item-content"]
                          }
                        >
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="">
            <h4
              className={`${styles["detail-content__title-section"]} ${styles["detail-content__title-section-form"]}`}
            >
              Gửi bình luận
            </h4>
            {sendSuccess ?   <div className={styles["send-success"]}>
                Gửi bình luận thành công, vui lòng chờ được duyệt!
            </div> : ""}
          
            <p>
              Email của bạn sẽ không bị công khai, hãy điền đầy đủ thông tin các
              trường có dấu sao *
            </p>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className={styles["detail-content-comment-form"]}
            >
              <div>
                <label className="">Nội dung: *</label>
                <textarea
                  {...register("content", {
                    required: {
                      value: true,
                      message: "Yêu cầu nhập thông tin",
                    },
                    minLength: {
                      value: 2,
                      message: "Nhập tối thiểu 2 kí tự",
                    },
                  })}
                  id="description"
                  placeholder="Nội dung..."
                  className="w-full p-4 text-gray-600 rounded-md outline-none min-h-[100px] bg-indigo-50"
                ></textarea>
                <span className={styles["show-error"]}>
                  {errors?.content ? errors?.content.message as string : ""}
                </span>
              </div>
              <div>
                <label>Name: *</label>
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Yêu cầu nhập thông tin",
                    },
                    minLength: {
                      value: 2,
                      message: "Nhập tối thiểu 2 kí tự",
                    },
                  })}
                  type="text"
                  placeholder="VD: Nguyễn A"
                  id="name"
                  className="w-full px-2 py-3 rounded outline-none text-md bg-indigo-50"
                />
              </div>
              <span className={styles["show-error"]}>
                {errors?.name ? errors?.name.message as string : ""}
              </span>
              <div>
                <label>Email: *</label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Yêu cầu nhập thông tin",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Định dạng email chưa đúng!",
                    },
                  })}
                  type="email"
                  placeholder="VD: abc@gmail.com"
                  id="email"
                  className="w-full px-2 py-3 rounded outline-none text-md bg-indigo-50"
                />
                <span className={styles["show-error"]}>
                  {errors?.email ? errors?.email.message as string : ""}
                </span>
              </div>
              <div className={styles["detail-content-comment-form-btn"]}>
                <button
                  type="submit"
                  className={styles["detail-content-comment-form__btn"]}
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugPost = params?.slugPost as string;
  try {
    const dataDetailBlog : any= await readBlog(slugPost);
    const related: any = await relatedBlog(slugPost);
    const comments = dataDetailBlog.comment.filter((item: any) => item.status === 1);
    return {
      props: {
        dataDetailBlog: dataDetailBlog.blog,
        comments,
        related,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default PageContentDetail;
