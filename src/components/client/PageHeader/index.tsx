import React from "react";
import styles from "./PageHeader.module.css";

type Props = {
  title?: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className={styles["page-title-section"]}>
      <h1 className={styles["page__title"]}>{title}</h1>
    </div>
  );
};

export default PageHeader;
