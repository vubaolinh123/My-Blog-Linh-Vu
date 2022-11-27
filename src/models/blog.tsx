export interface IBlog {
    _id?: string,
    title: string,
    slug: string,
    poster: string,
    author: string,
    image: string,
    desc: string,
    shortDesc: string,
    status: string | number,
    categoryBlog: [],
    tagBlog: [],
    createdAt?: number | string,
    updatedAt?: number | string
}