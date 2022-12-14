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
        document.documentElement.style.setProperty("--bg-footer-bottom", data?.bgFooterBottom)!;
        document.documentElement.style.setProperty("--text-footer-bottom", data?.textFooterBottom)!;
     
      }
    };
    getBlogOfCate();
    
  }, []);

  return (
    infoWeb ?
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
    </div> : <div className="flex items-center justify-start h-screen">
      <button disabled type="button" className=" space-x-2   m-auto py-2.5 px-5 text-xl font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
        <svg role="status" className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
        </svg> Đang Tải Website... </button>
      </div>
  );
};
export default Layout;
