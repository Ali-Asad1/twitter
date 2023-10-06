import { useEffect } from "react";

export const useKeyPress = (targetKey: string, onClick: () => void) => {
  const keyPressHandler = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [targetKey, onClick]);
};
