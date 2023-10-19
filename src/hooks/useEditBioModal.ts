import { create } from "zustand";

type useEditBioModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useEditBioModal = create<useEditBioModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
