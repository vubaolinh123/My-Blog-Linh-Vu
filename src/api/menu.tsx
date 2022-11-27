import { IMenu } from "../models/menu";
import instance from "./instance";

export const getAll = () => {
    return instance.get('/menus');
}
export const add = (type: IMenu) => {
    return instance.post("/menus", type);
};
export const removeItem = (id: number) => {
    return instance.delete(`/menus/${id}`);
};
export const update = (type: IMenu) => {
    return instance.put(`/menus/${type.id}`, type);
};
export const read = (id: number) => {
    return instance.get(`/menus/${id}`);
};