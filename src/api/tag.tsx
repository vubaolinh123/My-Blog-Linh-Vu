import { ITag } from "../models/tag";
import instance from "./instance";

export const getAll = () => {
    return instance.get('/tag');
}
export const add = (tag: ITag) => {
    return instance.post("/tag", tag);
};
export const removeItem = (slug: string) => {
    return instance.delete(`/tag/${slug}`);
};
export const update = (tag: any) => {
    return instance.put(`/tag/${tag.idSlugUpdate}`, tag);
};
export const read = (slug: string, limit: number = 100) => {
    return instance.get(`/tag/${slug}?limit=${limit}`);
};