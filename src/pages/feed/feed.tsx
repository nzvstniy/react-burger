import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { connect as orderFeedConnect, disconnect as orderFeedDisconnect } from '../../services/reducer-selector-directory/orderFeed/order-feed-actions';
import { getOrderFeed } from '../../services/reducer-selector-directory/orderFeed/order-feed-selector';
import Orders from '../../components/Orders/orders';
import Preload from '../../components/Preload/preload';
import { WEBSOCKET, ROUTES } from '../../utils/api';
import Stats from '../../components/Stats/stats';
import styles from './feed.module.css';

const FeedPage = () => {
  const dispatch = useAppDispatch();

  //const wsOrdersAll = ${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll};

  useEffect(() => {
    dispatch(orderFeedConnect(`${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`));

    return () => {
      dispatch(orderFeedDisconnect()) 
    };
  }, []);

  const orders = useAppSelector(getOrderFeed);

  return (
    <>
      {orders ? (
        <main>
          <div className={styles.wrapper}>
            <h1 className={`${styles.heading} text text_type_main-large`}>Лента заказов</h1>
            <div className={styles.gallery}>
              <Orders
                ordersData={orders}
                dynamicRoute={ROUTES.orders}
                status={false}
              />
              <Stats />
            </div>
          </div>
        </main>
      ) : (
        <div className={styles.preload}><Preload /></div>
      )}
    </>
  );
};

export default FeedPage;