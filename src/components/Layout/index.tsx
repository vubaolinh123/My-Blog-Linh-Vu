import React, { useEffect, useState } from "react";
import useColor from "../../hooks/useColor";
import useSetting from "../../hooks/useSetting";
import { LayoutProps } from "../../models/layout";
import Aside from "../client/Aside";
import Footer from "../client/Footer";
import Header from "../client/Header";
import MenuSide from "../client/MenuSide";
import styles from "./LayoutClient.module.css";

const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(true)

  const [infoWeb, setInfoWeb] = useState();
  const { getAllColor, error } = useColor();

  useEffect(() => {
    const getBlogOfCate = async () => {
      const [data]: any = await getAllColor();
      setInfoWeb(data)
      const rootCss = document.querySelector(":root");
      if (rootCss) {
        document.documentElement.style.setProperty("--bg-top", data?.bgTop)!;
        document.documentElement.style.setProperty("--text-top", data?.textTop)!;
        document.documentElement.style.setProperty("--bg-header", data?.bgHeader)!;
        document.documentElement.style.setProperty("--text-logo", data?.textLogo)!;
        document.documentElement.style.setProperty("--text-menu", data?.textMenu)!;
        document.documentElement.style.setProperty("--text-menu-hover", data?.textMenuHover)!;

        document.documentElement.style.setProperty("--btn-menu", data?.bgTop)!;
        document.documentElement.style.setProperty("--bg-btn", data?.bgBtn)!;
        document.documentElement.style.setProperty("--bg-btn-hover", data?.bgBtnHover)!;
        
        document.documentElement.style.setProperty("--icon-sun", data?.iconSun)!;
        document.documentElement.style.setProperty("--icon-folder", data?.iconFolder)!;
        document.documentElement.style.setProperty("--icon-gear", data?.iconGear)!;
        document.documentElement.style.setProperty("--icon-img", data?.iconImage)!;
        document.documentElement.style.setProperty("--icon-blog", data?.iconPen)!;

        document.documentElement.style.setProperty("--bg-main", data?.bgMain)!;
        document.documentElement.style.setProperty("--text-main", data?.textMain)!;
        document.documentElement.style.setProperty("--text-main-link", data?.textMainLink)!;
        document.documentElement.style.setProperty("--bg-main-content", data?.bgMainContent)!;
        document.documentElement.style.setProperty("--aside-link", data?.asideLink)!;

        document.documentElement.style.setProperty("--bg-footer", data?.bgFooter)!;
        document.documentElement.style.setProperty("--text-footer", data?.textFooter)!;
        document.documentElement.style.setProperty("--text-link-footer", data?.textLinkFooter)!;
     
      }
    };
    getBlogOfCate();
    
    setLoading(false)
  }, []);

  return (
    !loading ?
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Header infoWeb={infoWeb}/>
        <main className={styles["main-section"]}>
          <div className={`section-inside ${styles["main-container"]}`}>
            <div className={styles["main-content"]}>{children}</div>
            <Aside infoWeb={infoWeb}/>
          </div>
        </main>
        <Footer infoWeb={infoWeb}/>
      </div>
      <MenuSide />
    </div> : "Loading..."
  );
};
export default Layout;
