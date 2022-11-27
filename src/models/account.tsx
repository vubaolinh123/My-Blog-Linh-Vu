export interface IAccount {
    _id?: string | number,
    name: string,
    email: string,
    password: string,
    role: number,
    status: number,
    salt: string,
    createdAt?: number | string,
    updatedAt?: number | string
}