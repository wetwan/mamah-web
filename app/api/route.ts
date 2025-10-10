import { LoginData, singUpData } from "./schema";
import axios from "axios";






export const loginUser = async (info: LoginData) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/login`, // ✅ remove extra /api/
        info
    );
    return data;
};
export const signUpUser = async (info: singUpData) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/register`, // ✅ remove extra /api/
        info
    );
    return data;
};