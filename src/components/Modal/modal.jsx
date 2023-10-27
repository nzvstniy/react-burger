import React, { useEffect } from 'react';
import ModalOverlay from '../ModalOverlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModalClosing from '../../hooks/useModalClosing';



function Modal({ children, id, setModal, modalClose, title, ...rest }) {

  useModalClosing(id, setModal, modalClose);


  return createPortal(
    <ModalOverlay id={id} setModal={setModal} {...rest}>
      <div className={`${styles.wrapper} p-10`}>
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button className="btn-default" onClick={modalClose}>
          <CloseIcon type="primary"/>
          </button>
        </div>
        {children}
        </div>

    </ModalOverlay>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  modalClose: PropTypes.func
};

export default Modal;
