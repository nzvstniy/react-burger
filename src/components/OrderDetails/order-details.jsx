import React from 'react';
import styles from './order-details.module.css';
import orderImg from '../../images/orderDone.png';
import { useSelector } from 'react-redux';
import {getNewOrder} from '../../services/reducer-selector-directory/orderDetails/order-details-selector';
import Preload from '../Preload/preload';
  function OrderDetails() {
    const newOrder = useSelector(getNewOrder);

  return newOrder ?(
    <div className={styles.wrapper}>
      <h2 className={`${styles.neon} text text_type_digits-large mb-8`}> {newOrder} </h2>
      <p className="text text_type_main-medium ">Идентификатор заказа</p>
      <img src={orderImg} alt="Заказ готов" className="mt-15 mb-15"/>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )  : (<Preload />)
  ;
}




export default OrderDetails;
