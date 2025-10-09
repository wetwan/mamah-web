/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ShopdataProp } from "@/constant";

// Define store shape
type CartItem = {
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
};

// Create store with correct types
export const useCart = create<CartStore>((set) => ({
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
        // update existing item quantity
        const updatedItem = [...state.item];
        updatedItem[existingIndex].quantity += quantity;
        return { item: updatedItem };
      }

      // add as new item
      return {
        item: [
          ...state.item,
          { product, quantity, selectedColor, selectedSize },
        ],
      };
    }),
}));
