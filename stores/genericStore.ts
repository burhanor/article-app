import { create } from "zustand";
import { ActionTypes } from "@/enums/ActionTypes";

export interface GenericStore<T> {
  items: T[];
  selectedItems: T[];
  actionType: ActionTypes;

  setItems: (items: T[]) => void;
  addItem: (item: T) => void;
  updateItem: (item: T) => void;
  deleteItem: (ids: number[]) => void;

  setSelectedItems: (items: T[]) => void;
  setActionType: (actionType: ActionTypes) => void;
}

export function createGenericStore<T extends { id: number }>() {
  return create<GenericStore<T>>()((set) => ({
    items: [],
    selectedItems: [],
    actionType: ActionTypes.UNDEFINED,

    setItems: (items) => set({ items }),
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    updateItem: (item) =>
      set((state) => ({
        items: state.items.map((i) => (i.id === item.id ? item : i)),
      })),
    deleteItem: (ids) =>
      set((state) => ({
        items: state.items.filter((i) => !ids.includes(i.id)),
      })),
    setSelectedItems: (items) => set({ selectedItems: items }),
    setActionType: (actionType) => set({ actionType }),
  }));
}
