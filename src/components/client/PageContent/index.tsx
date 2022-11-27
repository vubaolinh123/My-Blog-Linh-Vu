/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { path } from "../../../constants/path";
import Icon from "../../Icons";
import Category from "./Components/Category";
import InfoPost from "./Components/InfoPost";
import TagList from "./Components/TagList";
import styles from "./PageContent.module.css";

type Props = {
  data?: any;
  resultText?: string
};

const PageContent = ({ data, resultText }: Props) => {
  if (!data) return <div className="">Loading...</div>;
  return (
    <div className={styles["page-content"]}>
      <div className={styles["page-content-list"]}>
        {data?.length === 0
          ? resultText ? resultText : "Hiện tại chưa có bài viết thuộc danh mục này!"
          : data?.map((item:any, index:any) => (
              <div key={index} className={styles["page-content-item"]}>
                <Link href={`${path.public.rootRoute}${item.slug}`}>
                  <img
                    className={styles["page-content-item__img"]}
                    src={item.image}
                    alt=""
                  />
                </Link>
                <div className={styles["page-content-item__text"]}>
                  <div className={styles["page-content-item__text-category"]}>
                    <Category categoryName={item.categoryBlog} />
                  </div>
                  <h3 className={styles["page-content-item__title"]}>
                    <Link href={`${path.public.rootRoute}${item.slug}`}>
                      <a
                        className={styles["page-content-item__title-link"]}
                        href={`${path.public.rootRoute}${item.slug}`}
                      >
                        {item.title}
                      </a>
                    </Link>
                  </h3>
                  <InfoPost date={item.createdAt} author={item.author} />
                  <p className={styles["page-content-item__desc-short"]}>
                    {item.shortDesc}.{" "}
                  </p>
                  <div className={styles["page-content-item__text-tag"]}>
                    <TagList tags={item.tagBlog} />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PageContent;
