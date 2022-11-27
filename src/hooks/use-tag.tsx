import useSWR from "swr";
import { add, read, removeItem, update } from "../api/tag";

const useTag = () => {
    const { data, error, mutate } = useSWR(`/tag`);

    const remove = async (slug: any) => {
        const confirm = window.confirm("Bạn chắc chắn muốn xóa?");
        if (confirm) {
            await removeItem(slug);
            mutate(data.filter((item: any) => item.slug !== slug));
        }
    };
    const create = async (cate: any) => {
        const addCate = await add(cate);
        mutate([...data, addCate]);
    };
    const detail = async (id: any) => {
        const addCate = await read(id);
        return addCate;
    };
    const editTag = async (cate: any) => {
        await update(cate);
        mutate(data.map((item: any) => (item._id === data._id ? cate : item)));
    };

    return {
        data,
        error,
        remove,
        create,
        detail,
        editTag,
    };
};

export default useTag;
