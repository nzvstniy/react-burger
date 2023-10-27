import React, { useContext, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import ingredientsValue from '../../../utils/ingredients-value';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../../OrderDetails/order-details';
import Modal from '../../Modal/modal';
import { useState } from 'react'
import IngredientContext from '../../../contexts/ingredientsContext';

import api from '../../../utils/api';


async function sendOrder(order, saveOrder) {
  try {
    const res = await fetch(api.order, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: order }),
    });

    if (res.ok) {
      const success = await res.json();

      return saveOrder(success);
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  } catch (error) {
    console.error(`Error status: ${error}`);
  }
}


function BurgerConstructor({ ingredientSelect, bunSelect, totalPrice }) {

  const ingredients = useContext(IngredientContext);

  const [orderDetailsModal, setOrderDetailsModal] =
    useState(false);

  const handleNewOrder = (event) => {
    event.preventDefault();

    if (event.type === 'click') {
      const order = [bunSelect, ...ingredientSelect].map(
        (ingredientSelect) => ingredientSelect._id
      );
      sendOrder(order, setNewOrder);
      setOrderDetailsModal(true);
    }
  };

  const handleModalClose = () => {
    setOrderDetailsModal(false);
  };
  const [newOrder, setNewOrder] = useState({});

  const bun = (posRu, posEng) => {
    return (
      (Object.keys(bunSelect).length && (
        <ConstructorElement
          extraClass={styles.bun}
          type={posEng}
          isLocked
          text={`${bunSelect.name} (${posRu})`}
          price={bunSelect.price}
          thumbnail={bunSelect.image}
        />
      )) || <div className={styles.bunContainer} />
    );
  };


  return (
    <>
      <section aria-label="Оформление заказа">
        <form className={styles.order}>
          {bun('верхняя', 'top')}
          {(ingredientSelect.length && (
            <div className={`${styles.components} my-scroll`}>
              {ingredientSelect.map(({ _id, name, price, image }) => (
                <div key={`container-${_id}`} className={styles.item}>
                  <DragIcon key={`icon-${_id}`} type="primary" />
                  <ConstructorElement
                    key={_id}
                    text={name}
                    price={price}
                    thumbnail={image}
                  />
                </div>
              ))}
            </div>
          )) || <div className={styles.componentEmpty} />}

          {bun('нижняя', 'bottom')}

          <div className={styles.info}>
            <div className={styles.price}>
              <span>{totalPrice.state}</span>
              <CurrencyIcon />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={handleNewOrder}
            >
              Оформить заказ
            </Button>
          </div>
        </form>
      </section>

      <Modal

        id="order-details"
        setModal={orderDetailsModal}
        modalClose={handleModalClose}
      >
        <OrderDetails newOrder={newOrder} />
      </Modal>


    </>
  );
};

BurgerConstructor.propTypes = ingredientsValue;


export default BurgerConstructor;
