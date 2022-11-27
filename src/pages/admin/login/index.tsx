/* eslint-disable @next/next/no-img-element */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import LayoutEmpty from "../../../components/Layout/empty";
import stylesAdmin from "../../../styles/Admin.module.css";
import styles from "./Login.module.css";
import { login } from "../../../api/account";
import { useRouter } from "next/router";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm: any) => {
    try {
      const data = await login(dataForm);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Đăng nhập quản trị thành công");
      router.push("/admin")
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className={styles["login-form-container"]}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className={styles["login-form"]}
        >
          <h4 className={styles["login-form-title"]}>Đăng nhập quản trị</h4>
          {/* <Link href="/">
            <img
              className={styles["login-form-back-home__img"]}
              src="https://i0.wp.com/danielplays.net/wp-content/uploads/2022/03/2022-03-12_15.34.29.png?w=1920&ssl=1"
              alt="logo"
            />
          </Link> */}
          <div className={stylesAdmin["form-content-section"]}>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Tên tài khoản</label>
              <input
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Yêu cầu nhập thông tin",
                  },
                })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {errors?.name ? errors?.name.message as string : ""}
              </span>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Mật Khẩu</label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Yêu cầu nhập thông tin",
                  },
                })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {errors?.password ? errors?.password.message as string : ""}
              </span>
            </div>
            <div
              className={`${stylesAdmin["form-input-section"]} ${styles["login-form-button-container"]}`}
            >
              <Button
                className={styles["login-form-button"]}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
Login.Layout = LayoutEmpty;

export default Login;
