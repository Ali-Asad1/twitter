import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/utils/clsx";

import Button from "../common/Button";

type ImageDropzoneProps = {
  onChange: (file: File) => void | Promise<void>;
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onChange }) => {
  const { getInputProps, getRootProps, open, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: (acceptedFile) => {
      const file = acceptedFile[0];
      if (file) {
        onChange(file);
      }
    },
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
