
import axios from "axios";
import { LoginData, singUpData } from "./schema";



const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/";



export const loginUser = async (info: LoginData) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/login`, // ✅ remove extra /api/
        info
    );
    return data;
};

export const signUpUser = async (info: singUpData) => {
    const { data } = await axios.post(
        `${API_URL}user/register`, // ✅ remove extra /api/
        info
    );
    return data;
};