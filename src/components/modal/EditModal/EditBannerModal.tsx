import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useEdgeStore } from "@/libs/edgeStore";
import { useEditBannerModal } from "@/hooks/useEditBannerModal";
import { useEditBannerImage } from "@/hooks/useEditUser";
import useCurrentUser from "@/hooks/useCurrentUser";

import Modal from "../Modal";
import ImageDropzone from "@/components/imageDropzone/ImageDropzone";
import Button from "@/components/common/Button";

const EditBannerModal = () => {
  const [file, setFile] = useState<File>();
  const [thumbnail, setThumbnail] = useState<string>();

  const { edgestore } = useEdgeStore();
  const { data, isLoading } = useCurrentUser();
  const { mutateAsync: mutateBanner } = useEditBannerImage();
  const { onClose } = useEditBannerModal();

  const updateAvatar = async () => {
    if (file) {
      const toastId = toast.loading("Updating banner ...");
      try {
        const res = await edgestore.publicImages.upload({
          file,
          input: {
            category: "banner",
            username: data?.username as string,
          },
          options: {
            replaceTargetUrl: data?.coverImage || undefined,
          },
        });

        await mutateBanner(res.url);

        toast.success("Update successfuly", {
          id: toastId,
        });
      } catch (err: unknown) {
        console.log(err);
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
      setThumbnail(data?.coverImage || "");
    }
  }, [isLoading]);

  return (
    <Modal onClose={onClose}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full aspect-w-3 aspect-h-1 bg-slate-3 rounded-md overflow-hidden mb-2">
          {thumbnail && (
            <Image
              fill
              src={thumbnail}
              alt="banner"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={thumbnail}
            />
          )}
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
            disabled={!thumbnail || thumbnail === data?.coverImage}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default EditBannerModal;
