import { FC, ReactNode, } from 'react';
import ModalOverlay from '../ModalOverlay/modal-overlay';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModalClosing from '../../custom-hooks/useModalClosing';

interface IModalProps {
  id: string;
  children: ReactNode;
  setModal?: boolean;
  modalClose: () => void;
  isLoading?: boolean;
}

const Modal: FC<IModalProps> = ({ children, id, setModal = true, modalClose, ...rest }) => {

  useModalClosing(id, setModal, modalClose);
  if(!setModal) return null;
  return createPortal(
    <ModalOverlay id={id} setModal={setModal} {...rest}>
      <div className={styles.modal}>
      <button
          className={styles.button}
          data-test="close-button"
          type="button"
          onClick={modalClose}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
