import { useState, useCallback } from "react";

interface IModalState {
  isModalOpen: boolean;
}

interface IModalActions {
  modalOpen: () => void;
  modalClose: () => void;
}

export const useModal = (): IModalState & IModalActions => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    modalOpen,
    modalClose,
  };
};