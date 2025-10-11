import { ShopdataProp } from "@/constant";
import { create } from "domain";
import { persist } from "zustand/middleware";

type CartStore = {
    items: ShopdataProp[];
    setProdcuts: (items: ShopdataProp) => unknown
};


export const useProduct = create<CartStore>()(
    persist(
        (set) => ({
            items: [],

            setProdcuts: (items: ShopdataProp) => set({ items }),

            resetCart: () => set({ item: [] }),
        }),
        {
            name: "product-storage",
        }
    )
);



