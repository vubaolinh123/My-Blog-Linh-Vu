import instance from "./instance";

export const getAll = () => {
    return instance.get('/logo');
}
export const update = (color: any) => {
    return instance.put(`/logo/${color._id}`, color);
};
export const read = (id: string | number) => {
    return instance.get(`/logo/${id}`);
};