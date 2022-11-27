import { IBanner } from "../models/banner";
import instance from "./instance";

export const getAll = () => {
    return instance.get('/banners');
}
export const add = (type: IBanner) => {
    return instance.post("/banners", type);
};
export const removeItem = (id: number) => {
    return instance.delete(`/banners/${id}`);
};
export const update = (type: IBanner) => {
    return instance.put(`/banners/${type.id}`, type);
};
export const read = (id: number) => {
    return instance.get(`/banners/${id}`);
};