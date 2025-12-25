import { useState } from "react";

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
}

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const openConfirm = (
    callback: () => void,
    opts?: ConfirmOptions
  ) => {
    setOptions(opts || {});
    setOnConfirm(() => callback);
    setIsOpen(true);
  };

  const closeConfirm = () => {
    setIsOpen(false);
    setOptions({});
    setOnConfirm(null);
  };

  const confirm = () => {
    if (onConfirm) onConfirm();
    closeConfirm();
  };

  return {
    isOpen,
    options,
    openConfirm,
    closeConfirm,
    confirm,
  };
};
