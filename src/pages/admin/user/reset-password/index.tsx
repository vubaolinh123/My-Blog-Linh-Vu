/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Button } from 'antd'
import React from 'react'
import LayoutAdmin from '../../../../components/Layout/admin'
import stylesAdmin from "../../../../styles/Admin.module.css";
import styles from "./ResetPassword.module.css";
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Đổi mật khẩu</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles["login-form-container"]}>
        <form
          action=""
        //   onSubmit={handleSubmit(onSubmit)}
          className={styles["login-form"]}
        >
          <h4 className={styles["login-form-title"]}>Đổi mật khẩu</h4>
          <div className={stylesAdmin["form-content-section"]}>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Mật khẩu cũ</label>
              <input
                type="password"
                // {...register("password", {
                //   required: {
                //     value: true,
                //     message: "Yêu cầu nhập thông tin",
                //   },
                // })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {/* {errors?.password && errors?.password?.message} */}
              </span>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Mật khẩu mới</label>
              <input
                type="password"
                // {...register("password", {
                //   required: {
                //     value: true,
                //     message: "Yêu cầu nhập thông tin",
                //   },
                // })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {/* {errors?.password && errors?.password?.message} */}
              </span>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                // {...register("password", {
                //   required: {
                //     value: true,
                //     message: "Yêu cầu nhập thông tin",
                //   },
                // })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {/* {errors?.password && errors?.password?.message} */}
              </span>
            </div>
            <div
              className={`${stylesAdmin["form-input-section"]} ${styles["login-form-forgot"]}`}
            >
              {/* <Link href="">Quên mật khẩu?</Link> */}
            </div>
            <div
              className={`${stylesAdmin["form-input-section"]} ${styles["login-form-button-container"]}`}
            >
              <Button
                className={styles["login-form-button"]}
                type="primary"
                htmlType="submit"
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
Dashboard.Layout = LayoutAdmin

export default Dashboard