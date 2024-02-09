import { create } from "zustand";

type OrderStore = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const useOrderStore = create<OrderStore>((set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useOrderStore;
