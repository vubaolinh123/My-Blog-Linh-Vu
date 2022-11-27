import Link from "next/link";
import React from "react";
import { path } from "../../../../../constants/path";
import styles from "./Category.module.css";

type Props = {
  categoryName?: [];
};

const Category = ({ categoryName }: Props) => {
  return (
    <div className={styles["page-content-item__category"]}>
      Danh mục{" "}
      {categoryName?.map((item: any, index: any) => (
        <Link href={`${path.public.categoryRoute}${item.slug}`} key={index}>
          <a
            className={styles["page-content-item__category-link"]}
            href={`${path.public.categoryRoute}${item.slug}`}
          >
            {index > 0 && ", "}
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Category;
