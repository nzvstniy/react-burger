import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ConstructorSingleElement from '../../ConstructorSingleElement/constructor-single-element';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ data, modalOpen }) => {
  const getPrice = useMemo(() => {
    return Array.from(data).reduce((price, singleIng) => {
      return singleIng.type === 'bun' ? price + singleIng.price * 2 : price + singleIng.price;
    }, 0);
  }, [data]);

  return (
    data.length > 0 && (
      <section className={`${styles.wrapper} mt-25 pl-4`}>
        {data.map(item => {
          return item.type === 'bun' && <ConstructorSingleElement data={item} key={item._id} type="top" />;
        })}
        <ul className={`${styles.list} list-default my-scroll pr-2`}>
          {data.map(item => item.type !== 'bun' && (
                <li key={item._id}> <ConstructorSingleElement data={item} /> </li>
              )
          )}
        </ul>
        {data.map(item => { 
          return (
            item.type === 'bun' && <ConstructorSingleElement data={item} key={item._id} type="bottom" />
          );
        })}
        <div className={`${styles.checkout} mt-6`}>
          <p className="text text_type_digits-medium mr-2">{getPrice}</p>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="ml-10 mr-4"
            onClick={modalOpen}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    )
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  modalOpen: PropTypes.func
};

export default BurgerConstructor;
