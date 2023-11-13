import React, { useEffect } from 'react';
import ModalOverlay from '../ModalOverlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModalClosing from '../../custom-hooks/useModalClosing';



function Modal({ children, id, setModal=true, modalClose, ...rest }) {

  useModalClosing(id, setModal, modalClose);


  return createPortal(
    <ModalOverlay id={id} setModal={setModal} {...rest}>
      <div className={`${styles.wrapper}`}>
          <button className="btn-default" onClick={modalClose}>
          <CloseIcon type="primary"/>
          </button>
        {children}
        </div>
    </ModalOverlay>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  modalClose: PropTypes.func,
  setModal: PropTypes.bool,
};

Modal.defaultProps = {
  setModal: true,
}

export default Modal;
