import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { path } from "../../../constants/path";
import Icon from "../../Icons";
import styles from "./FormSearch.module.css";

type Props = {};

const FormSearch = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // search
  const getValueSearch = (value: any) => {
    if (value.keyword.trim() === "") {
      return;
    } else {
      let keyword = value.keyword.trim();
      if(router.pathname != '/search'){
        router.push({
          pathname: `${path.public.rootRoute}/search`,
          query: { keyword: `${keyword}` },
        });
      }else{
        router.push({
          query: { keyword: `${keyword}` }
        });
      }
      reset();
    window.scrollTo(0, 0)

    }
  };
  return (
    <form
      onSubmit={handleSubmit(getValueSearch)}
      className={styles["search__form"]}
      action=""
    >
      <input
        {...register("keyword")}
        className={styles["search__input"]}
        type="text"
        placeholder="Search"
        required
      />
      <button className={styles["search__btn"]}>
        <Icon.Search />
      </button>
    </form>
  );
};

export default FormSearch;
