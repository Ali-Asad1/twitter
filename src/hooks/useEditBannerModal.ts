import { create } from "zustand";

type EditBannerModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useEditBannerModal = create<EditBannerModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
