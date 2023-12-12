import { useAppSelector } from "../../../services/hooks";
import { getNewOrder } from "../../../services/reducer-selector-directory/orderDetails/order-details-selector";
import Preload from "../../Preload/preload";
import styles from './fulfilled-order.module.css'
import orderImg from '../../../images/orderDone.png'

const FulfilledOrder = () => {
    const newOrder = useAppSelector(getNewOrder);

    return newOrder ? (
        <>
        <span className={`${styles.order} text text_type_digits-large`}>{newOrder}</span>
        <h3 className={`${styles.heading} text text_type_main-medium`}>идентификатор заказа</h3>
        <img className={styles.image} src={orderImg} alt="Заказ готов"/>
      </>
    ) : (<Preload />);
}

export default FulfilledOrder;