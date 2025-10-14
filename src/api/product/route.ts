
import axios from "axios";
import { Order } from "./schema";




export const getProducts = async () => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/all`,
    );

    return data.products || data.prodcuts || [];
}


export const getProduct = async (id: string) => {

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/${id}`,

    );

    return data
}

export const getorder = async () => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}order/my-orders`,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

        }
    );
    return data;
};

export const makePayment = async (id: string) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}order/my-orders`,
        id, {

        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

    }
    );
    return data;
};



export const createOrder = async (order: Order) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}order/create`,
        order,
        // {
        //     headers: {
        //         token,
        //     },
        // }
    );
    return data;
};