import React, { useMemo } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

import { cn } from "@/utils/clsx";

import Button from "../common/Button";

type onDrop = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;

type ImageDropzoneProps = {
  onChange: (base64: string) => void;
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onChange }) => {
  const changeHandler = (base64: string) => {
    onChange(base64);
  };

  const dropHandler: onDrop = (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      changeHandler(event.target?.result as string);
    };

    reader.readAsDataURL(file);
  };
  const { getInputProps, getRootProps, open, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    noClick: true,
    noKeyboard: true,
    onDrop: dropHandler,
  });

  const dropzoneStyle = useMemo(
    () =>
      cn(
        "w-full h-full flex flex-col justify-center items-center border-2 border-dashed border-slate-6 rounded bg-slate-2 outline-none text-slate-11 transition-colors",
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
