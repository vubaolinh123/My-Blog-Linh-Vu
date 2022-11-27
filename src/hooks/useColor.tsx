import useSWR from "swr";
import { getAll, read, update } from "../api/color";

const useColor = () => {
    const { data, error, mutate } = useSWR(`/colors`);
    
    const getAllColor = async () => {
        const colors = await getAll();
        return colors;
    }
    const detail = async (id: any) => {
        const color = await read(id);
        return color;
    };
    const edit = async (cate: any) => {
        await update(cate);
        mutate(data.map((item: any) => (item._id === data._id ? cate : item)));
    };

    return {
        data,
        error,
        getAllColor,
        detail,
        edit,
    };
};

export default useColor;
