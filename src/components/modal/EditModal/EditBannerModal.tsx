import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { useEditBannerModal } from "@/hooks/useEditBannerModal";
import { useEditBannerImage } from "@/hooks/useEditUser";
import useCurrentUser from "@/hooks/useCurrentUser";

import Modal from "../Modal";
import ImageDropzone from "@/components/imageDropzone/ImageDropzone";
import Button from "@/components/common/Button";

const EditBannerModal = () => {
  const [base64, setBase64] = useState<string | null | undefined>(null);

  const { isOpen, onClose } = useEditBannerModal();
  const { data, isLoading } = useCurrentUser();
  const { mutateAsync: updateBanner } = useEditBannerImage();

  const updateSubmit = async () => {
    const toastId = toast.loading("Updating profile ...");
    updateBanner(base64 || "")
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
      setBase64(data?.coverImage);
    }
  }, [isLoading]);

  return (
    <Modal onClose={onClose}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full aspect-w-3 aspect-h-1 bg-slate-3 rounded-md overflow-hidden mb-2">
          {base64 && (
            <Image
              fill
              src={base64}
              alt="banner"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={base64}
            />
          )}
        </div>
        <div className="flex-1">
          <ImageDropzone onChange={setBase64} />
        </div>
        <div className="flex justify-center gap-x-5 mt-5">
          <Button btnWidth="full" btnStyle="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button btnWidth="full" btnStyle="primary" onClick={updateSubmit} disabled={!base64}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default EditBannerModal;
