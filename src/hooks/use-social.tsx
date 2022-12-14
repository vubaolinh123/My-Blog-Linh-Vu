import useSWR from "swr";
import { add, read, removeItem, update } from "../api/social";

const useSocial = () => {
    const { data, error, mutate } = useSWR(`/social`);

    const remove = async (id: any) => {
        const confirm = window.confirm("Bạn chắc chắn muốn xóa?");
        if (confirm) {
            await removeItem(id);
            mutate(data.filter((item: any) => item._id !== id));
        }
    };
    const create = async (social: any) => {
        const addSocial = await add(social);
        mutate([...data, addSocial]);
    };
    const detail = async (id: any) => {
        const cate = await read(id);
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

export default useSocial;
