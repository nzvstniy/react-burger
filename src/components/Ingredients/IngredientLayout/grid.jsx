import React from 'react';
import PropTypes from 'prop-types';
import styles from './layout.module.css';
import Card from './card';

const Grid = ({ type, ingredient, updateConstructor, modalOpen }) => {
  return (
    <div className={`${styles.grid} pt-6 pr-4 pb-10 pl-4`}>
      {Array.from(ingredient)
        .filter(element => element.type === type)
        .map(item => (
          <Card
            data={item}
            key={item._id}
            updateConstructor={updateConstructor}
            modalOpen={modalOpen}
          />
        ))}
    </div>
  );
};

Grid.propTypes = {
  type: PropTypes.string,
  ingredient: PropTypes.arrayOf(PropTypes.object),
  updateConstructor: PropTypes.func,
  modalOpen: PropTypes.func
};

export default Grid;
