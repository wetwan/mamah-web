import { LoginData } from "./schema";
import axios from "axios";



export const loginUser = async (info: LoginData) => {

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/login`,
        {
            info
        }
    );

    return data
}