import { ShopdataProp } from "@/src/types/tpes";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export type ProductColor = {
    name: string;
    hex?: string;
    available: boolean;
    _id: string; // Assuming this is the unique ID for the color
};

export type CartItem = {
    id: string;
    product: ShopdataProp;
    quantity: number;
    selectedColor?: ProductColor;
    selectedSize?: string;
};

type CartStore = {
    item: CartItem[];
    addProduct: (
        product: ShopdataProp,
        quantity: number,
        selectedColor?: ProductColor,
        selectedSize?: string,

    ) => void;
    removeProduct: (cartItemId: string) => void;
    resetCart: () => void;
};

// ✅ Persisted cart store
export const useCart = create<CartStore>()(
    persist(
        (set) => ({
            item: [],

            addProduct: (product, quantity, selectedColor, selectedSize) =>
                set((state) => {
                    const existingIndex = state.item.findIndex(
                        (i) => {
                            const sameProduct = i.product.id === product.id;
                            const sameColor = i.selectedColor === selectedColor;
                            const sameSize = i.selectedSize === selectedSize;
                            return sameProduct && sameColor && sameSize;
                        }
                    );

                    if (existingIndex !== -1) {
                        const updatedItem = [...state.item];
                        updatedItem[existingIndex].quantity += quantity;
                        return { item: updatedItem };
                    }

                    return {
                        item: [
                            ...state.item,
                            { id: crypto.randomUUID(), product, quantity, selectedColor, selectedSize },
                        ],
                    };
                }),

            removeProduct: (productId) =>
                set((state) => ({
                    item: state.item.filter((i) => i.id !== productId),
                })),

            resetCart: () => set({ item: [] }),
        }),
        {
            name: "cart-storage", // key in localStorage
        }
    )
);
