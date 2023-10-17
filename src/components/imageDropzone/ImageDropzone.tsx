import { cn } from "@/utils/clsx";
import React, { useMemo } from "react";
import Button from "../common/Button";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

export type DropzoneOnDrop = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;

type ImageDropzoneProps = {
  onDrop?: DropzoneOnDrop;
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onDrop }) => {
  const baseStyle =
    "w-full h-full flex flex-col justify-center items-center border-2 border-dashed border-slate-6 rounded bg-slate-2 outline-none text-slate-11 transition-colors";

  const { getInputProps, getRootProps, open, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const dropzoneStyle = useMemo(
    () =>
      cn(
        baseStyle,
        isFocused && "border-blue-8",
        isDragAccept && "border-green-8",
        isDragReject && "border-red-8"
      ),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div
      {...getRootProps({
        className: dropzoneStyle,
      })}
    >
      <input {...getInputProps()} />
      <p>drop or select your image</p>
      <Button btnStyle="secondary" onClick={open} className="mt-4">
        Select
      </Button>
    </div>
  );
};

export default ImageDropzone;
