import React from "react";
import useSWR from "swr";
import { add, read, removeItem, update } from "../api/menu";

const useMenu = () => {
    const { data, error, mutate } = useSWR(`/menus?_sort=createAt&_order=desc`);

    const remove = async (id: any) => {
        const confirm = window.confirm("Bạn chắc chắn muốn xóa?");
        if (confirm) {
            await removeItem(id);
            mutate(data.filter((item: any) => item.id !== id));
        }
    };
    const create = async (cate: any) => {
        const dataOne = await add(cate);
        mutate([...data, dataOne]);
    };
    const detail = async (id: any) => {
        const dataOne = await read(id);
        return dataOne;
    };
    const edit = async (cate: any) => {
        await update(cate);
        mutate(data.map((item: any) => (item.id === data.id ? cate : item)));
    };

    return {
        data,
        error,
        remove,
        create,
        detail,
        edit,
    };
};

export default useMenu;
