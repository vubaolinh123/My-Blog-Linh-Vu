import React from "react";
import { formatDate, formatDateTime } from "../../../../../utils/formatDate";
import styles from "./InfoPost.module.css";


type Props = {
  date?: string;
  author?: string;
};

const InfoPost = ({ date, author }: Props) => {
  return (
    <div className={styles["page-content-item__info"]}>
      Đăng ngày{" "}
      <span className={styles["page-content-item__info-item"]}>{date ? formatDateTime(date) : ""} </span>
      bởi{" "}
      <span className={styles["page-content-item__info-item"]}>{author ? author : ""} </span>
    </div>
  );
};

export default InfoPost;
