import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ children, id, setModal, status = false, }) {

  return (
    <div
      className={`${styles.overlay}${(!status && setModal && ` ${styles.opened}`) || ''
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
  setModal: PropTypes.bool,
  status: PropTypes.bool,
};

ModalOverlay.defaultProps = {
  status: false,
}
export default ModalOverlay;

