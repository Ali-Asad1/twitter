import { create } from "zustand";

interface EditProfileModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEditProfileModal = create<EditProfileModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
