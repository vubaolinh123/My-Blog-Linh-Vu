import useSWR from "swr";
import { getAll, read, update } from "../api/setting";

const useSetting = () => {
    const { data, error, mutate } = useSWR(`/logo`);
    const getAllData = async () => {
        const logo = await getAll();
        return logo;
    }
    const detail = async (id: any) => {
        const logo = await read(id);
        return logo;
    };
    const edit = async (cate: any) => {
        await update(cate);
        mutate(data.map((item: any) => (item._id === data._id ? cate : item)));
    };

    return {
        data,
        error,
        getAllData,
        detail,
        edit,
    };
};

export default useSetting;
