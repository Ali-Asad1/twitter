import { useEffect } from "react";

export const useClickOutSide = (ref: React.RefObject<Element>, onClick: () => void) => {
  const clickHandler = (event: Event) => {
    if (ref.current && !ref.current.contains(event?.target as Node)) {
      onClick();
    }

    useEffect(() => {
      document.addEventListener("mousedown", clickHandler);
      document.addEventListener("touchmove", clickHandler);

      return () => {
        document.removeEventListener("mousedown", clickHandler);
        document.removeEventListener("touchmove", clickHandler);
      };
    }, [ref, onClick]);
  };
};
