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
import styles from "./ChangePass.module.css";
import { changePassword } from "../../../api/account";
import { useRouter } from "next/router";

type Props = {};

const ChangePass = (props: Props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm: any) => {
    try {
      console.log(dataForm)
      if(dataForm.newPassword !== dataForm.ConfirmNewPass){
        toast.error("Mật khẩu nhập lại không khớp");
      }else{
        const data = await changePassword(dataForm);
        toast.success("Đổi Mật Khẩu Thành Công");
        localStorage.removeItem('user')
        router.push("/admin/login")
        setTimeout(()=>{
          location.reload();
        },1000)
      }
      
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
          <h4 className={styles["login-form-title"]}>Đổi Mật Khẩu Admin</h4>
          <div className={stylesAdmin["form-content-section"]}>
          <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Tên Tài Khoản</label>
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
              <label className={stylesAdmin["form__label"]}>Mật Khẩu Cũ</label>
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
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Mật Khẩu Mới</label>
              <input
                type="password"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "Yêu cầu nhập thông tin",
                  },
                })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {errors?.newPassword ? errors?.newPassword.message as string : ""}
              </span>
            </div>
            <div className={stylesAdmin["form-input-section"]}>
              <label className={stylesAdmin["form__label"]}>Nhập Lại Mật Khẩu Mới</label>
              <input
                type="password"
                {...register("ConfirmNewPass", {
                  required: {
                    value: true,
                    message: "Yêu cầu nhập thông tin",
                  },
                })}
                className={stylesAdmin["form__input"]}
              />
              <span className={stylesAdmin["form__text-error"]}>
                {errors?.ConfirmNewPass ? errors?.ConfirmNewPass.message as string : ""}
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
                Đổi Mật Khẩu
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
ChangePass.Layout = LayoutEmpty;

export default ChangePass;
