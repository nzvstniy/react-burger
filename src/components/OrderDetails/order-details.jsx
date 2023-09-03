import React from 'react';
import styles from './order-details.module.css';
import orderImg from '../../images/orderDone.png';

const OrderDetails = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.neon} text text_type_digits-large mb-8`}>034536</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={orderImg} alt="Заказ готов"/>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
