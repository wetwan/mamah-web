
import axios from "axios";
import { Order } from "./schema";
import { useMutation } from "@tanstack/react-query";




export const getProducts = async () => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/all?limit=0`
    );

    return data.products || data.prodcuts || [];
}


export const getProduct = async (id: string) => {

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/${id}`,

    );

    return data
}

export const getOrders = async (token: string, page = 1, limit = 50) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}order/my-orders?page=${page}&limit=${limit}`,
        { headers: { token } }
    );

    return data;
};
export const getNotify = async (token: string) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}notify`,
        { headers: { token } }
    );

    console.log(data);
    return data;
};
export const acknowledgeNotification = async (token: string, id: string) => {
    const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}notify/${id}/read`,
        {},
        { headers: { token } }
    );
    return data;
};
export const getOrder = async (orderId: string,) => {
    // export const getOrder = async (orderId: string, token: string) => {


    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}order/${orderId}`,
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        //     withCredentials: true
        // }
    );
    return data.order;
};



export const createOrder = async (order: Order, token: string) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}order/create`,
        order,
        {
            headers: {
                token,
            },

        }
    );
    return data;
};


export const useCreateOrder = () =>
    useMutation({
        mutationFn: async (cartData) => {
            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}orders/create`,
                cartData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return data;
        },
    });