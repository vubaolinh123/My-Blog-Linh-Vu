import { IAccount } from "../models/account";
import instance from "./instance";


export const login = (infoAccount: IAccount) => {
    return instance.post("/login", infoAccount);
};
