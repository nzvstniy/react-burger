import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ children, id, setModal }) {
  return (
    <div
      className={`${styles.overlay}${
        (setModal && ` ${styles.opened}`) || ''
      }`}
      id={id}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  setModal: PropTypes.bool.isRequired,
};

export default ModalOverlay;

