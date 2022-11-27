import Link from "next/link";
import React from "react";
import { path } from "../../../../../constants/path";
import Icon from "../../../../Icons";
import styles from "./TagList.module.css";

type Props = {
  tags?: any;
};

const TagList = ({ tags }: Props) => {
  return (
    <div className={styles["page-content-item__tags"]}>
      
      {tags?.length > 0 ? ( 
        <span className="">
          <Icon.Tags className={styles["page-content-item__tags-icon"]} />  Tags
        </span>
      ) : (
        ""
      )}
      {" "}
      {tags?.map((item: any, index: any) => (
        <Link href={`${path.public.tagRoute}${item.slug}`} key={index}>
          <a
            className={styles["page-content-item__tag-item"]}
            href={`${path.public.tagRoute}${item.slug}`}
          >
            {index > 0 && ", "}
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TagList;
