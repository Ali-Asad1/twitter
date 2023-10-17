"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { useEditProfileModal } from "@/hooks/useEditProfileModal";
import { useEditProfileImage } from "@/hooks/useEditUser";

import ImageDropzone from "@/components/imageDropzone/ImageDropzone";
import Modal from "../Modal";
import Avatar from "@/components/user/Avatar";
import Button from "@/components/common/Button";
import useCurrentUser from "@/hooks/useCurrentUser";

const EditProfileModal = () => {
  const [base64, setBase64] = useState<string | null | undefined>(null);
  const { isOpen, onClose } = useEditProfileModal();
  const { data, isLoading } = useCurrentUser();
  const { mutateAsync: updateAvatar } = useEditProfileImage();

  const updateSubmit = async () => {
    const toastId = toast.loading("Updating profile ...");
    updateAvatar(base64 || "")
      .then(() => {
        toast.success("Update successfuly", {
          id: toastId,
        });
      })
      .catch(() => {
        toast.error("Update failure!", {
          id: toastId,
        });
      })
      .finally(() => {
        onClose();
      });
  };

  useEffect(() => {
    if (!isLoading) {
      setBase64(data?.profileImage);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Modal onClose={onClose}>
            <div className="w-full h-full pt-5 flex flex-col">
              <div className="flex justify-center mb-5">
                <Avatar size="lg" src={base64 || ""} username="" />
              </div>
              <div className="flex-1">
                <ImageDropzone onChange={setBase64} />
              </div>
              <div className="flex justify-center gap-x-5 mt-5">
                <Button btnWidth="full" btnStyle="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  btnWidth="full"
                  btnStyle="primary"
                  onClick={updateSubmit}
                  disabled={!base64}
                >
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
