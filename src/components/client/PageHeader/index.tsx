import React from "react";
import styles from "./PageHeader.module.css";

type Props = {
  title?: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className={styles["page-title-section"]}>
      <h2 className={styles["page__title"]}>{title}</h2>
    </div>
  );
};

export default PageHeader;
