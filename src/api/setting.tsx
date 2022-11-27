import instance from "./instance";

export const getAll = () => {
    return instance.get('/logo');
}
export const update = (data: any) => {
    return instance.put(`/logo/${data._id}`, data);
};
export const read = (id: string | number) => {
    return instance.get(`/logo/${id}`);
};