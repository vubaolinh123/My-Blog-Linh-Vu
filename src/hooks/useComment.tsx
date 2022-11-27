import React from "react";
import useSWR from "swr";
import { create, removeItem, update} from "../api/comment";

const useComment = () => {
    const { data, error, mutate } = useSWR(`/comment`);

    const add = async (item: any) => {
        const color = await create(item);
        return color;
    };
    const remove = async (id: any) => {
        const confirm = window.confirm("Bạn chắc chắn muốn xóa?");
        if (confirm) {
            await removeItem(id);
            mutate(data.filter((item: any) => item.id !== id));
        }
    };

    const editOpen = async (comment: any) => {
        const confirm = window.confirm("Bạn có muốn đổi trạng thái bình luận?");
        if (confirm) {
            await update(comment, 1);
            mutate(data.map((item: any) => (item._id === data._id ? comment : item)));
        }
    };

    const editClose = async (comment: any) => {
        const confirm = window.confirm("Bạn có muốn đổi trạng thái bình luận?");
        if (confirm) {
            await update(comment, 0);
            mutate(data.map((item: any) => (item._id === data._id ? comment : item)));
        }
    };

    return {
        data,
        error,
        add,
        remove,
        editOpen,
        editClose
    };
};

export default useComment;
