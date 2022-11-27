import instance from "./instance";

export const getAll = () => {
    return instance.get('/comment');
}
export const create = (item: any) => {
    return instance.post('/comment', item);
}
export const read = (id: string | number) => {
    return instance.get(`/comment/${id}`);
};
export const removeItem = (id: number | string) => {
    return instance.delete(`/comment/${id}`);
};

export const update = (id: number | string, status: number) => {
    return instance.put(`/comment/${id}`, {status: status});
};

export const getCommentByStatus = (status: number) => {
    return instance.get(`/comment?status=${status}`);
};