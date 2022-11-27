/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { path } from "../../../constants/path";
import Icon from "../../Icons";
import styles from "./BlogItem.module.css";

type Props = {
  dataItem: any;
};
const BlogItem = ({ dataItem }: Props) => {
  return (
    <div className={styles["latest-blog-item"]}>
      <div className={styles["latest-blog-item-img"]}>
        <Link href={`${path.public.rootRoute}${dataItem.slug}`}>
          <img
            className={styles["latest-blog-item__img"]}
            src={dataItem.image}
            alt=""
          />
        </Link>
      </div>
      <div className={styles["latest-blog-item-content"]}>
        <h3 className={styles["latest-blog-item__title"]}>
          <Link href={`${path.public.rootRoute}${dataItem.slug}`}>
            <a
              href={`${path.public.rootRoute}${dataItem.slug}`}
              className={styles["latest-blog-item__title-link"]}
            >
              {dataItem.title} 
            </a>
          </Link>
        </h3>
        <p className={styles["latest-blog-item__desc-short"]}>
          {dataItem.shortDesc} 
        </p>
        <Link href={`${path.public.rootRoute}${dataItem.slug}`}>
          <button className={styles["latest-blog-item__btn"]}>
            Chi tiết <Icon.Right />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
