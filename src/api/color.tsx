import instance from "./instance";

export const getAll = () => {
    return instance.get('/colors');
}
export const update = (color: any) => {
    return instance.put(`/colors/${color._id}`, color);
};
export const read = (id: string | number) => {
    return instance.get(`/colors/${id}`);
};