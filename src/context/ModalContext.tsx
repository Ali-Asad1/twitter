"use client";

import EditBannerModal from "@/components/modal/EditModal/EditBannerModal";
import EditProfileModal from "@/components/modal/EditModal/EditProfileModal";
import { useEditBannerModal } from "@/hooks/useEditBannerModal";
import { useEditProfileModal } from "@/hooks/useEditProfileModal";
import { AnimatePresence } from "framer-motion";

const ModalContext = () => {
  const { isOpen: isOpenBannedModal } = useEditBannerModal();
  const { isOpen: isOpenProfileModal } = useEditProfileModal();

  return (
    <AnimatePresence>
      {isOpenProfileModal && <EditProfileModal />}
      {isOpenBannedModal && <EditBannerModal />}
    </AnimatePresence>
  );
};
export default ModalContext;
