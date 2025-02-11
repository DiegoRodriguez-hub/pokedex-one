import { create } from "zustand";

export const useName = create((set) => ({
        name: '',
        setName: (name) => set({ name }),
        clearName: () => set({ name: ''}),
    }))