import { useEffect } from 'react';


export default function useModalClosing(id: string, open: boolean, handleClose: () => void) {

  useEffect(() => {
    if (!open) return;

    const closeModal = (event: Event) => {
      if (
        (event?.target as Element)?.id === id || (event as KeyboardEvent)?.key === 'Escape') {
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