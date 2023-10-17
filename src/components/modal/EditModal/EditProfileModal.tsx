"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useEditProfileModal } from "@/hooks/useEditProfileModal";

import ImageDropzone, { DropzoneOnDrop } from "@/components/imageDropzone/ImageDropzone";
import Modal from "../Modal";
import Avatar from "@/components/user/Avatar";
import Button from "@/components/common/Button";

const EditProfileModal = () => {
  const [fileImage, setFileImage] = useState<string | null>(null);
  const { isOpen, onClose } = useEditProfileModal();

  const onDrop: DropzoneOnDrop = (file) => {
    const preview = URL.createObjectURL(file[0]);
    setFileImage(preview);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Modal onClose={onClose}>
            <div className="w-full h-full pt-5 flex flex-col">
              <div className="flex justify-center mb-5">
                <Avatar size="lg" src={fileImage || ""} username="" />
              </div>
              <div className="flex-1">
                <ImageDropzone onDrop={onDrop} />
              </div>
              <div className="flex justify-center gap-x-5 mt-5">
                <Button btnWidth="full" btnStyle="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button btnWidth="full" btnStyle="primary">
                  Save
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
export default EditProfileModal;
