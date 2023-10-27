import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { AlertTriangle } from "lucide-react";
import { ItemsTable } from "@/types";

interface CartStore {
  items: ItemsTable[];
  addItem: (data: ItemsTable, size: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ItemsTable, size: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === data.id && item.selectedSize === size,
        );

        if (existingItem) {
          return toast("Item with the same size already in cart.");
        }

        data.selectedSize = size; // set the selected size
        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
