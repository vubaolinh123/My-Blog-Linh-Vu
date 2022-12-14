import instance from "./instance";

export const getAll = () => {
    return instance.get('/social');
}
export const add = (social: any) => {
    return instance.post("/social", social);
};
export const removeItem = (id: number | string) => {
    return instance.delete(`/social/${id}`);
};
export const update = (social: any) => {
    return instance.put(`/social/${social._id}`, social);
};
export const read = (id: string ) => {
    return instance.get(`/social/${id}`);
};