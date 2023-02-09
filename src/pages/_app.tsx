/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import Layout from "../components/Layout";
import instance from "../api/instance";
import { AppPropsWithLayout } from "../models/layout";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Router } from "next/router";
import Head from "next/head";
import HeadMeta from "../components/Meta";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper: any = Component.Layout ?? Layout;
  return (
    <>
      <LayoutWrapper>
        <SWRConfig value={{ fetcher: async (url) => await instance.get(url) }}>
           <HeadMeta title={"Blog"}/>
          <Component {...pageProps} />
          <ToastContainer />
        </SWRConfig>
      </LayoutWrapper>
    </>
  );
}

export default MyApp;
