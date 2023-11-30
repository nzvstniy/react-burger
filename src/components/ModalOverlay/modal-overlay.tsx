import React, { FC, ReactNode } from 'react';
import styles from './modal-overlay.module.css';
import classNames from 'classnames';

export interface IModalOverlayProps {
  children: ReactNode;
  id: string;
  setModal: boolean;
  isLoading?: boolean;
}

const ModalOverlay: FC<IModalOverlayProps> = ({
  children, id, setModal,
}) => (

  <div
    className={classNames(styles.overlay, {
      [styles.opened]: setModal,
    })}
    id={id}
  >
    {children}
  </div>
);

export default ModalOverlay;

