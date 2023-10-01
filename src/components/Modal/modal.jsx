import React, { useEffect } from 'react';
import ModalOverlay from '../ModalOverlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById('modal');

const Modal = ({ children, title, modalClose }) => {

  useEffect(() => {
    const escapeHandler = event => {
      if (event.key === 'Escape') {
        modalClose();
      }
    };

    document.addEventListener('keydown', escapeHandler);
    return () => { document.removeEventListener('keydown', escapeHandler) };
  }, []);

  return createPortal(
    <ModalOverlay modalClose={modalClose}>
      <div className={`${styles.wrapper} p-10`} onClick={event => event.stopPropagation()}>
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button className="btn-default" onClick={modalClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  modalClose: PropTypes.func
};

export default Modal;
