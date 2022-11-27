/* eslint-disable @next/next/no-img-element */
import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { read } from "../api/categoryBlog";
import BlogItem from "../components/client/BlogItem";
import ImageItem from "../components/client/ImageItem";
import LatestNewsItem from "../components/client/LatestNewsItem";
import HeadMeta from "../components/Meta";
import styles from "../styles/Home.module.css";

type HomeProps = {
  news: any;
  blogs: any;
  images: any;
};

const Home: NextPage<HomeProps> = ({ news, blogs, images }) => {
  const dataNewsBlog = news.blog.filter(
    (item: { status: number }) => item.status === 1
  );
  const dataBlogsBlog = blogs.blog.filter(
    (item: { status: number }) => item.status === 1
  );
  const dataImageBlog = images.blog.filter(
    (item: { status: number }) => item.status === 1
  );

  return (
    <div className={styles.container}>
      <HeadMeta title={"Trang chủ"} />
      <main className={styles["home"]}>
        <section className={styles["home-section"]}>
          <h2 className={styles["home-section__title"]}>
            {news.cateBlog.name}
          </h2>
          <div
            className={`${styles["home-section-content"]} ${styles["home-section-news"]}`}
          >
            {dataNewsBlog.length > 0
              ? dataNewsBlog?.map((item: any, index: any) => (
                  <LatestNewsItem key={index} dataItem={item} />
                ))
              : "Hiện tại chưa có bài viết nào!"}
          </div>
        </section>
        <section className={styles["home-section"]}>
          <h2 className={styles["home-section__title"]}>
            {" "}
            {blogs.cateBlog.name}
          </h2>
          <div
            className={`${styles["home-section-content"]} ${styles["home-section-blog"]}`}
          >
            {dataBlogsBlog.length > 0
              ? dataBlogsBlog?.map((item: any, index: any) => (
                  <BlogItem key={index} dataItem={item} />
                ))
              : "Hiện tại chưa có bài viết nào!"}
          </div>
        </section>
        <section className={styles["home-section"]}>
          <h2 className={styles["home-section__title"]}>
            {images.cateBlog.name}
          </h2>
          <div
            className={`${styles["home-section-content"]} ${styles["home-section-img"]}`}
          >
            {dataImageBlog.length > 0
              ? dataImageBlog?.map((item: any, index: any) => (
                  <ImageItem key={index} dataItem={item} />
                ))
              : "Hiện tại chưa có bài viết nào!"}
          </div>
        </section>
      </main>
    </div>
  );
};
export const getStaticProps: any = async (context: GetStaticPropsContext) => {
  try {
    const dataNews = await read("tin-tuc", 6);
    const dataBlog = await read("bai-viet", 6);
    const dataImage = await read("hinh-anh", 3);

    return {
      props: {
        news: dataNews,
        blogs: dataBlog,
        images: dataImage,
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
export default Home;
