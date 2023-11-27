import React, { FC, ReactNode } from 'react';
import styles from './modal-overlay.module.css';

export interface IModalOverlayProps {
  children: ReactNode;
  id: string;
  setModal: boolean;
  isLoading?: boolean;
}

const ModalOverlay: FC<IModalOverlayProps> = ({
  children, id, setModal, isLoading = false,
}) => (

  <div
    className={`${styles.overlay}${(!isLoading && setModal && ` ${styles.opened}`) || ''
      }`}
    id={id}
  >
    {children}
  </div>
);

export default ModalOverlay;

