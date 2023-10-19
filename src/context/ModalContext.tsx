"use client";

import { AnimatePresence } from "framer-motion";

import { useEditBannerModal } from "@/hooks/useEditBannerModal";
import { useEditBioModal } from "@/hooks/useEditBioModal";
import { useEditProfileModal } from "@/hooks/useEditProfileModal";

import EditBannerModal from "@/components/modal/EditModal/EditBannerModal";
import EditBioModal from "@/components/modal/EditModal/EditBioModal";
import EditProfileModal from "@/components/modal/EditModal/EditProfileModal";

const ModalContext = () => {
  const { isOpen: isOpenBannedModal } = useEditBannerModal();
  const { isOpen: isOpenProfileModal } = useEditProfileModal();
  const { isOpen: isOpenBioModal } = useEditBioModal();

  return (
    <AnimatePresence>
      {isOpenProfileModal && <EditProfileModal />}
      {isOpenBannedModal && <EditBannerModal />}
      {isOpenBioModal && <EditBioModal />}
    </AnimatePresence>
  );
};
export default ModalContext;
