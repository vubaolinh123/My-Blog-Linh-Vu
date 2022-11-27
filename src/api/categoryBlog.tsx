import { ICategoryBlog } from "../models/categoryBlog";
import instance from "./instance";

export const getAll = () => {
    return instance.get('/categoryBlog');
}
export const add = (blog: ICategoryBlog) => {
    return instance.post("/categoryBlog", blog);
};
export const removeItem = (slug: number | string) => {
    return instance.delete(`/categoryBlog/${slug}`);
};
export const update = (blog: any) => {
    return instance.put(`/categoryBlog/${blog.idSlugUpdate}`, blog);
};
export const read = (slug: string, limit: number = 100 ) => {
    return instance.get(`/categoryBlog/${slug}?limit=${limit}`);
};