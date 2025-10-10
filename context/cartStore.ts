import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShopdataProp } from "@/constant";

export type CartItem = {
    product: ShopdataProp;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
};

type CartStore = {
    item: CartItem[];
    addProduct: (
        product: ShopdataProp,
        selectedColor: string,
        selectedSize: string,
        quantity: number
    ) => void;
    removeProduct: (productId: string) => void;
    resetCart: () => void;
};

// ✅ Persisted cart store
export const useCart = create<CartStore>()(
    persist(
        (set) => ({
            item: [],

            addProduct: (product, selectedColor, selectedSize, quantity) =>
                set((state) => {
                    const existingIndex = state.item.findIndex(
                        (i) =>
                            i.product.id === product.id &&
                            i.selectedColor === selectedColor &&
                            i.selectedSize === selectedSize
                    );

                    if (existingIndex !== -1) {
                        const updatedItem = [...state.item];
                        updatedItem[existingIndex].quantity += quantity;
                        return { item: updatedItem };
                    }

                    return {
                        item: [
                            ...state.item,
                            { product, quantity, selectedColor, selectedSize },
                        ],
                    };
                }),

            removeProduct: (productId) =>
                set((state) => ({
                    item: state.item.filter((i) => i.product.id !== productId),
                })),

            resetCart: () => set({ item: [] }),
        }),
        {
            name: "cart-storage", // key in localStorage
        }
    )
);
