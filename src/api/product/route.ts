import axios from "axios";
import { Order } from "./schema";


const token = localStorage.getItem("token");


export const getProducts = async () => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/all`,
    );

    return data
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
            headers: {
                token,
            },
        }
    );
    return data;
};
export const makePayment = async (id: string) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}order/my-orders`,
        id, {
        headers: {
            token,
        },
    }
    );
    return data;
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