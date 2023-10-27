import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ children, id, resetData, setModal,  status = false,}) {  

  return (
    <div
      className={`${styles.overlay}${
        (!status && setModal && ` ${styles.opened}`) || ''
      }`}
      id={id}
      onTransitionEnd={resetData}
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
  resetData: PropTypes.func,
};

ModalOverlay.defaultProps = {
  status: false,
  resetData: undefined,
}
export default ModalOverlay;

