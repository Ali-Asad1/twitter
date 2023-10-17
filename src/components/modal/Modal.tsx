"use client";

import { useRef } from "react";
import { BiX } from "react-icons/bi";
import Button from "../common/Button";
import Overlay from "../overlay/Overlay";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { useKeyPress } from "@/hooks/useKeyPress";

type ModalProps = {
  onClose: () => void;
  closeBtn?: boolean;
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ onClose, closeBtn, children }) => {
  const containerRef = useRef(null);
  useClickOutSide(containerRef, onClose);
  useKeyPress("Escape", onClose);
  return (
    <Overlay>
      <div className="w-full h-full flex justify-center items-center px-5">
        <div
          ref={containerRef}
          className="relative w-full md:w-1/2 min-h-[350px] max-h-[450px] h-full p-4 bg-slate-3 rounded-md overflow-y-auto"
        >
          {closeBtn && (
            <Button
              onClick={onClose}
              btnType="iconOnly"
              btnStyle="tertiary"
              btnSize="md"
              className="absolute left-2 top-2"
            >
              <BiX size={24} />
            </Button>
          )}
          {children}
        </div>
      </div>
    </Overlay>
  );
};
export default Modal;
