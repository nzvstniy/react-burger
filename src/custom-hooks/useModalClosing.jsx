import { useEffect } from 'react';


export default function useModalClosing(id, open, handleClose) {

  useEffect(() => {
    if (!open) return;

    const closeModal = (event) => {
      if (event?.target?.id === id || event?.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
    };
  }, [open]);

}