"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 3000,
      }}
      {...props}
    />
  );
};

export { Toaster };