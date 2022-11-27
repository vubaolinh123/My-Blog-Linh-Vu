import React from "react";
import useSWR from "swr";
import { add, read, removeItem, update, updateTag, updateCate, search } from "../api/blog";

const useBlog = () => {
    const { data, error, mutate } = useSWR(`/blogs`);

    const remove = async (slug: any) => {
        const confirm = window.confirm("Bạn chắc chắn muốn xóa?");
        if (confirm) {
            await removeItem(slug);
            mutate(data.filter((item: any) => item.slug !== slug));
        }
    };

    const searchItem = async (keyword: string) => {
        const result = await search(keyword)
        return result
    };

    const create = async (blog: any) => {
        const addCate = await add(blog);
        mutate([...data, addCate]);
    };
    const detail = async (slug: any) => {
        const addCate = await read(slug, 1);
        return addCate;
    };
    const edit = async (blog: any) => {
        await update(blog);
        mutate(data.map((item: any) => (item._id === data._id ? blog : item)));
    };
    const editTag = async (blog: any, idTag: string) => {
        await updateTag(blog, idTag);
        mutate(data.map((item: any) => (item.slug === data.slug ? blog : item)));
    };
    const editCate = async (blog: any, idCate: string) => {
        await updateCate(blog, idCate);
        mutate(data.map((item: any) => (item.slug === data.slug ? blog : item)));
    };

    return {
        data,
        error,
        remove,
        create,
        detail,
        edit,
        editTag,
        editCate,
        searchItem
    };
};

export default useBlog;
