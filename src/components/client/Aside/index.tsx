import Link from "next/link";
import React, { useEffect, useState } from "react";
import { path } from "../../../constants/path";
import useCateBlog from "../../../hooks/use-cateBlog";
import styles from "./Aside.module.css";

type Props = {
  infoWeb: any
};
const Aside = ({infoWeb}: Props) => {
  const [dataBlogs, setDataBlogs] = useState<any>();
  const [dataCateBlog, setDataCateBlog] = useState<any>();
  const [dataNews, setDataNews] = useState<any>();
  const [dataCateNews, setDataCateNews] = useState<any>();
  const { detail, error } = useCateBlog();

  useEffect(() => {
    const getBlogOfCate = async () => {
      const dataAll: any = await detail("bai-viet", 4);
      const data = dataAll?.blog.filter((item: { status: number; }) => item.status === 1)
      const dataAllNews: any = await detail("tin-tuc");
      const dataNewsFilter = dataAllNews?.blog.filter((item: { status: number; }) => item.status === 1)

      
      setDataBlogs(data);
      setDataCateBlog(dataAll);
      setDataNews(dataNewsFilter[0]);
      setDataCateNews(dataAllNews)
    };
    getBlogOfCate();
  }, []);
  
  if (error) return <div>Failed to loading</div>;
  if(!detail) return <div>Loading...</div>
  return (
    <aside className={styles["aside"]}>
      <div className={styles["introduce-web"]}>
        {infoWeb?.intro}
      </div>
      <div className={styles["aside-section"]}>
        <h2 className={styles["aside__title-section"]}>{dataCateNews?.cateBlog.name} mới nhất</h2>
        <p>{!dataNews ? "Hiện tại chưa có bài viết!" : `${dataNews.title}`}</p>
      </div>
      <div className={styles["aside-section"]}>
        <h2 className={styles["aside__title-section"]}>{dataCateBlog?.cateBlog.name} gần đây</h2>
        <ul className={styles["aside-post-list"]}>
         {dataBlogs?.length === 0 ? "Hiện tại chưa có bài viết!" : dataBlogs?.map((item: { slug: any; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <li key={index} className={styles["aside-post-item"]}>
          <Link href={`${path.public.rootRoute}${item.slug}`}>
            <a href={`${path.public.rootRoute}${item.slug}`} className={styles["aside-post-item-link"]}>
              {item.title}
            </a>
          </Link>
        </li>
        ))} 
          
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
