import React from 'react';
import PropTypes from 'prop-types';
import styles from './app.module.css';

const Columns = ({ children }) => {
  return <div className={styles.columns}>{children}</div>;
};

Columns.propTypes = {
  children: PropTypes.node.isRequired
};

export default Columns;
