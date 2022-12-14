/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAll } from "../../../api/social";
import DataMenu from "../../../constants/DataMenu";
import { path } from "../../../constants/path";
import useCateBlog from "../../../hooks/use-cateBlog";
import Icon from "../../Icons";
import FormSearch from "../FormSearch";
import styles from "./Footer.module.css";

type Props = {
  infoWeb: any
};

const Footer = ({infoWeb}: Props) => {
  const [dataBlogs, setDataBlog] = useState<any>();
  const [dataSocial, setDataSocial] = useState<any>();
  const { detail, error } = useCateBlog();
  const dataMenu: any = DataMenu()
  
  
  useEffect(() => {
    const getBlogOfCate = async () => {
      const data = await detail("bai-viet", 4);
      const dataSocial: any = await getAll()
      setDataBlog(data);
      const dataFilter = dataSocial.filter((item: { status: number; }) => item.status === 1)
      setDataSocial(dataFilter)
    };
    getBlogOfCate();
    
  }, []);

  if (error) return <div>Failed to loading</div>;
  if(!detail) return <div>Loading...</div>

  return (
    <footer className={styles["footer"]}>
      <div className={`section-inside ${styles["footer-main"]}`}>
        <div className={styles["footer-main-grid"]}>
          <div className="">
            <div className={styles["logo"]}>
              <Link href={path.public.rootRoute}>
                <img
                  style={{"width": infoWeb?.sizeLogoFooter}}
                  className={styles["logo__img"]}
                  src={infoWeb?.url}
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="">
            <h6 className={styles["footer-title"]}>{dataBlogs?.cateBlog.name} gần đây</h6>
            <ul>
              {dataBlogs?.blog.length === 0
                ? "Hiện tại chưa có bài viết!"
                : dataBlogs?.blog.map((item: any, index: any) => (
                    <li key={index} className={styles["footer-menu-item"]}>
                      <Link href={`${path.public.rootRoute}${item.slug}`}>
                        <a className={styles["footer-menu-item-link"]} href={`${path.public.rootRoute}${item.slug}`}>
                          {item.title}
                        </a>
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="">
            <h6 className={styles["footer-title"]}>Links</h6>
            <ul>
              {dataMenu?.map((item: any, index: any) => (
                <li key={index} className={styles["footer-menu-item"]}>
                  <Link href={`${path.public.categoryRoute}${item.slug}`}>
                    <a
                      className={styles["footer-menu-item-link"]}
                      href={`${path.public.categoryRoute}${item.slug}`}
                    >
                     {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h6 className={styles["footer-title"]}>Social Media</h6>
            <ul className={styles["footer-social-list"]}>
              { dataSocial?.map((item: any, index: any)=>(
                <li className={styles["footer-menu-item"]} key={index}>
                <Link href="">
                  <a className={styles["footer-menu-item-link"]} onClick={()=>{ window.location = item?.linkTo}}>
                  <i className={item.urlIcon} style={{color: item.colorIcon, fontSize: item.sizeIcon}}></i> 
                  </a>
                </Link>
              </li>
              ))}
            </ul>
            <div className={styles["footer-form-search"]}>
              <FormSearch />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <span>© 2022 Copyright: </span>
        <a
          className="font-semibold text-gray-600"
          href=""
        >
          Ann Anh
        </a>
      </div>
    </footer>
  );
};

export default Footer;
