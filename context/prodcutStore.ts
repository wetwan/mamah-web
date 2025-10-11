import { ShopdataProp } from "@/constant";
import { create } from "zustand";

import { persist } from "zustand/middleware";

type ProductStore = {
    items: ShopdataProp[];
    setProducts: (items: ShopdataProp[]) => void;
};


export const useProduct = create<ProductStore>()(
    persist(
        (set) => ({
            items: [],

            setProducts: (items) => set({ items }),


        }),
        {
            name: "product-storage",
        }
    )
);



