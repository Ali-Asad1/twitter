"use client";

import { Toaster } from "react-hot-toast";

const ToastContext = () => {
  return <Toaster toastOptions={{ duration: 3000 }} />;
};
export default ToastContext;
