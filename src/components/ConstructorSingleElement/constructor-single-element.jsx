import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-single-element.module.css';

const ConstructorSingleElement = ({ data, type }) => {
  if (data.type === 'bun') {
    return (
      <div className={styles.menu}>
        <ConstructorElement
          isLocked={true}
          text={type === "top" ? data.name + " (верхняя)" : data.name + " (нижняя)"}
          price={data.price}
          thumbnail={data.image}
          type={type}
        />
      </div>
    );
  }
  else {
    return (
      <div className={styles.menu}>
        {data.type !== 'bun' && <DragIcon type="primary" />}
        <ConstructorElement
          isLocked={false}
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          type={type}
        />
      </div>
    );
  }

};

ConstructorSingleElement.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string
};

export default ConstructorSingleElement;
