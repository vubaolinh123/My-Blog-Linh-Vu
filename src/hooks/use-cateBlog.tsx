import useSWR from "swr";
import { add, read, removeItem, update } from "../api/categoryBlog";

const useCateBlog = () => {
    const { data, error, mutate } = useSWR<any>(`/categoryBlog`);

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
    const detail = async (slug: any, limit: number = 100) => {
        const cate = await read(slug, limit);
        return cate;
    };
    const editCate = async (cate: any) => {
        await update(cate);
        mutate(data.map((item: any) => (item._id === data._id ? cate : item)));
    };

    return {
        data,
        error,
        remove,
        create,
        detail,
        editCate,
    };
};

export default useCateBlog;
