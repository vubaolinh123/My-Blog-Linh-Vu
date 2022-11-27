import { IBlog } from "../models/blog";
import instance from "./instance";

export const getAll = () => {
    return instance.get('/blogs');
}
export const add = (blog: IBlog) => {
    return instance.post("/blogs", blog);
};
export const removeItem = (slug: number) => {
    return instance.delete(`/blogs/${slug}`);
};
export const update = (blog: any) => {
    return instance.put(`/blogs/${blog.idSlubUpdate}`, blog);
};
export const read = (slug: string, limit: number = 100) => {
    return instance.get(`/blogs/${slug}?limit=${limit}`);
};
export const relatedBlog = (slug: string) => {
    return instance.get(`/blogs/${slug}/related`);
}
export const updateTag = (blog: IBlog, idTag: string) => {
    return instance.put(`/blogs/${blog.slug}?tag=${idTag}`);
};
export const updateCate = (blog: IBlog, idCate: string) => {
    return instance.put(`/blogs/${blog.slug}?tag=${idCate}`);
};
export const search = (keyword: string) => {
    return instance.get(`/blogs?q=${keyword}`);
};
