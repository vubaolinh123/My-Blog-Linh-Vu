/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataMenu from "../../../constants/DataMenu";
import { path } from "../../../constants/path";
import Icon from "../../Icons";
import FormSearch from "../FormSearch";
import styles from "./Header.module.css";

type Props = {
  infoWeb: any
};

const Header = ({infoWeb}: Props) => {
  const dataMenu: any = DataMenu()
  return (
    <>
      <header>
        <div className={styles["header-top"]}>
          <div className={`section-inside ${styles["header-top-container"]}`}>
            <ul className={styles["header-social-list"]}>
              <li>
                <Link href="">
                  <a className={styles["header-social-item"]} onClick={()=>{ window.location = infoWeb?.urlYt}}>
                    Youtube 
                  </a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a className={styles["header-social-item"]} onClick={()=>{ window.location = infoWeb?.urlFb}}>
                    Facebook
                  </a>
                </Link>
              </li>
            </ul>
            <div className={styles["header-form"]}>
              <FormSearch />
            </div>
          </div>
        </div>
        <div className={styles["header-main"]}>
          <div className={`section-inside ${styles["header-main-container"]}`}>
            <div className={styles["logo"]}>
              <Link href={`${path.public.rootRoute}`}>
                <img
                  className={styles["logo__img"]}
                  src={infoWeb?.url}
                  alt=""
                />
              </Link>
              <div className={styles["logo__text"]}>
                <Link href={`${path.public.rootRoute}`}>
                  <a className={styles["logo__text-main"]} href="">
                  {infoWeb?.text}
                  </a>
                </Link>
                <span className={styles["logo__text-sub"]}>
                  {" "}
                  {infoWeb?.subTextLogo}
                </span>
              </div>
            </div>
            <nav className={styles["nav-menu"]}>
              <ul className={styles["menu-list"]}>
                {dataMenu?.map((item: any, index: any) => (
                  <li key={index} className={styles["menu-item"]}>
                    <Link href={`${path.public.categoryRoute}${item.slug}`}>
                      <a className={styles["menu-item-link"]} href={`${path.public.categoryRoute}${item.slug}`}>
                        <i className={item.urlIcon} style={{color: item.colorIcon, fontSize: item.sizeIcon}}></i> {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <label htmlFor="my-drawer-4" className={styles["nav-menu-btn"]}>
                <Icon.List className={styles["nav-menu-icon"]} />{" "}
                <span>Menu</span>
              </label>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
