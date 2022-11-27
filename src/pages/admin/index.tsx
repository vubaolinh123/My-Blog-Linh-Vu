import { Breadcrumb } from "antd";
import { Button } from "antd/lib/radio";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/Layout/admin";
import { path } from "../../constants/path";
import stylesAdmin from "../../../styles/Admin.module.css";
import useBlog from "../../hooks/use-blog";
import useTag from "../../hooks/use-tag";
import useCateBlog from "../../hooks/use-cateBlog";
import useComment from "../../hooks/useComment";
import { getCommentByStatus } from "../../api/comment";

const Dashboard = () => {
  const [countBlogOpen, setCountBlogOpen] = useState(0);
  const [countCommentClose, setCountCommentClose] = useState(0);
  const { data: dataBlog, error: errorBlog } = useBlog();
  const { data: tagBlog, error: errorTag } = useTag();
  const { data: cateBlog, error: errorBlogCate } = useCateBlog();
  const { data: dataComment, error: errorComment } = useComment();

  useEffect(()=>{
    const getAPI = async () => {
      const dataCm: any = await getCommentByStatus(0)
      setCountCommentClose(dataCm.length)
    }
    getAPI()
  },[])

  if (errorTag) return <div className="">{errorTag}</div>;
  if (errorBlog) return <div className="">{errorBlog}</div>;
  if (errorComment) return <div className="">{errorComment}</div>;
  if (errorBlogCate) return <div className="">{errorBlogCate}</div>;
  if (!cateBlog) return <div>Loading...</div>;
  if (!dataBlog) return <div>Loading...</div>;
  if (!tagBlog) return <div>Loading...</div>;
  if (!dataComment) return <div>Loading...</div>;



  
  

  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Thống Kê</Breadcrumb.Item>
        <Breadcrumb.Item>Danh Thống Kê</Breadcrumb.Item>
      </Breadcrumb>
      <div className="">
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full :text-orange-100 :bg-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-pen-fill"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-[14px] font-medium text-gray-600 :text-gray-400">
                Bài viết
              </p>
              <p className="text-xl font-semibold text-gray-700 :text-gray-200">
                {dataBlog?.length}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full :text-green-100 :bg-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-list-task"
                viewBox="0 0 16 16"
              >
                <path d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                <path d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-[14px] font-medium text-gray-600 :text-gray-400">
                Danh mục bài viết
              </p>
              <p className="text-xl font-semibold text-gray-700 :text-gray-200 renderIncome">
                {cateBlog?.length}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full :text-blue-100 :bg-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-tags-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-[14px] font-medium text-gray-600 :text-gray-400">
                Tags
              </p>
              <p className="text-xl font-semibold text-gray-700 :text-gray-200 renderAllBill">
                {tagBlog?.length}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full :text-teal-100 :bg-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-chat"
                viewBox="0 0 16 16"
              >
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-[14px] font-medium text-gray-600 :text-gray-400">
                Bình luận
              </p>
              <p className="text-xl font-semibold text-gray-700 :text-gray-200 renderPending">
                {dataComment?.length}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <Link href={path.private.commentRouter}>
            <div className="flex items-center justify-between p-3 mb-8 bg-white cursor-pointer">
              <div className="flex items-center gap-2">
                <h4 className="mb-0">Bình luận cần phê duyệt</h4>
                <span className="text-blue-500">Xem tất cả</span>
              </div>
              <span className="flex flex-row items-center justify-center w-12 h-12 p-2 text-lg font-bold text-red-800 bg-red-300 rounded-full">
                {countCommentClose}
              </span>
            </div>
          </Link>
        </div>
        {/* <div className="grid gap-6 mb-8 md:grid-cols-2">
          <div className="grid p-3 mb-8 bg-white md:grid-cols-2">
            <div className="">
              <h4>Danh mục hiển thị</h4>
            </div>
            <div className="">
              <h4>Danh mục đã được ẩn</h4>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="p-3 mr-2 text-green-500 bg-green-100 rounded-full w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              </div>
              <span className="p-3 mr-4 text-2xl font-bold w-fit">1</span>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="p-3 mr-2 text-yellow-500 bg-yellow-100 rounded-full w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                </svg>
              </div>
              <span className="p-3 mr-4 text-2xl font-bold w-fit">1</span>
            </div>
          </div>
          <div className="grid p-3 mb-8 bg-white md:grid-cols-2">
            <div className="">
              <h4>Danh mục hiển thị</h4>
            </div>
            <div className="">
              <h4>Danh mục đã được ẩn</h4>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="p-3 mr-2 text-green-500 bg-green-100 rounded-full w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              </div>
              <span className="p-3 mr-4 text-2xl font-bold w-fit">1</span>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="p-3 mr-2 text-yellow-500 bg-yellow-100 rounded-full w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                </svg>
              </div>
              <span className="p-3 mr-4 text-2xl font-bold w-fit">1</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
Dashboard.Layout = LayoutAdmin;

export default Dashboard;
