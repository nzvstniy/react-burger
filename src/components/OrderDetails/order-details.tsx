import styles from './order-details.module.css';
import PendingOrder from './PendingOrder/pending-order';
import FulfilledOrder from './FulfilledOrder/fulfilled-order';

interface IOrderDetailsProps{
  isPending: boolean;
}

const OrderDetails = ({ isPending }: IOrderDetailsProps) => (
  <div className={styles.wrapper}>
    {isPending ? <PendingOrder /> : <FulfilledOrder />}
    <p className={`${styles.order} text text_type_main-default`}>
      {isPending ? 'Ваш заказ начали готовить' : 'Ваш заказ готов'}
    </p>
    <p className={`${styles.ready} text text_type_main-default text_color_inactive`}>
      {isPending ? 'Дождитесь готовности на орбитальной станции' : 'Приятного аппетита!'}
    </p>
  </div>
);

export default OrderDetails;
