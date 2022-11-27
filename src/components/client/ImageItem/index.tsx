/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Icon from "../../Icons";
import styles from "./ImageItem.module.css";

type Props = {
  dataItem: any;
};

const ImageItem = ({ dataItem }: Props) => {
  return (
    <div className={styles["latest-news-item"]}>
      <div className={styles["latest-news-item-img"]}>
        <Link href={dataItem.slug}>
          <img
            className={styles["latest-news-item__img"]}
            src={dataItem.image}
            alt={dataItem.slug}
          />
        </Link>
      </div>
      <div className={styles["latest-news-item-content"]}>
        <h3 className={`${styles["latest-news-item__title"]}`}>
          <Link href={dataItem.slug}>
            <a href={dataItem.slug} className={styles["latest-news-item__title-link"]}>
            {dataItem.title}
            </a>
          </Link>
        </h3>
        <p className={styles["latest-news-item__desc-short"]}>
        {dataItem.shortDesc}
        </p>
        <Link href={dataItem.slug}>
          <button className={styles["latest-news-item__btn"]}>Chi tiết <Icon.Right /></button>
        </Link>
      </div>
    </div>
  );
};

export default ImageItem;
