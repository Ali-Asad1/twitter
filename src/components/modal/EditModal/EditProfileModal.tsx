"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useEdgeStore } from "@/libs/edgeStore";
import { useEditProfileModal } from "@/hooks/useEditProfileModal";
import { useEditProfileImage } from "@/hooks/useEditUser";
import useCurrentUser from "@/hooks/useCurrentUser";

import ImageDropzone from "@/components/imageDropzone/ImageDropzone";
import Modal from "../Modal";
import Avatar from "@/components/user/Avatar";
import Button from "@/components/common/Button";

const EditProfileModal = () => {
  const [file, setFile] = useState<File>();
  const [thumbnail, setThumbnail] = useState<string>();

  const { edgestore } = useEdgeStore();
  const { data, isLoading } = useCurrentUser();
  const { mutateAsync: mutateAvatar } = useEditProfileImage();
  const { onClose } = useEditProfileModal();

  const updateAvatar = async () => {
    if (file) {
      const toastId = toast.loading("Updating profile ...");
      try {
        const res = await edgestore.publicImages.upload({
          file,
          input: {
            category: "avatar",
            username: data?.username as string,
          },
          options: {
            replaceTargetUrl: data?.profileImage || undefined,
          },
        });

        await mutateAvatar(res.url);

        toast.success("Update successfuly", {
          id: toastId,
        });
      } catch (err: unknown) {
        toast.error("Update failure!", {
          id: toastId,
        });
      } finally {
        onClose();
      }
    }
  };
  const dropzoneOnChange = (file: File) => {
    setFile(file);

    const preview = URL.createObjectURL(file);
    setThumbnail(preview);
  };

  useEffect(() => {
    if (!isLoading) {
      setThumbnail(data?.profileImage || "");
    }
  }, [isLoading]);

  return (
    <Modal onClose={onClose}>
      <div className="w-full h-full pt-5 flex flex-col">
        <div className="flex justify-center mb-5">
          <Avatar size="lg" src={thumbnail || ""} username="" />
        </div>
        <div className="flex-1">
          <ImageDropzone onChange={dropzoneOnChange} />
        </div>
        <div className="flex justify-center gap-x-5 mt-5">
          <Button btnWidth="full" btnStyle="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            btnWidth="full"
            btnStyle="primary"
            onClick={updateAvatar}
            disabled={!thumbnail || thumbnail === data?.profileImage}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default EditProfileModal;
