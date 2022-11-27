import Link from "next/link";
import React from "react";
import DataMenu from "../../../constants/DataMenu";
import { path } from "../../../constants/path";
import Icon from "../../Icons";
import styles from "../Header/Header.module.css";

type Props = {};

const MenuSide = (props: Props) => {
  const dataMenu:any = DataMenu()
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <ul
        className={`p-4 menu w-80 bg-base-100 text-base-content ${styles["menu-list"]}`}
      >
        <label htmlFor="my-drawer-4" className="text-right cursor-pointer">
          <Icon.Close className="text-2xl" />
        </label>
        {dataMenu?.map((item:any, index:any) => (
          <li key={index} className={styles["menu-item"]}>
            <Link href={`${path.public.categoryRoute}${item.slug}`}>
              <a className={styles["menu-item-link"]} href={`${path.public.categoryRoute}${item.slug}`}>
              <i className={item.urlIcon} style={{color: item.colorIcon, fontSize: item.sizeIcon}}></i> {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSide;
