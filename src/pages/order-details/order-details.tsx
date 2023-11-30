import { useEffect } from 'react';
import { useAppDispatch } from '../../services/hooks';
import { connect as orderFeedConnect, disconnect as orderFeedDisconnect } from '../../services/reducer-selector-directory/orderFeed/order-feed-actions';
import styles from './order-details.module.css';
import { WEBSOCKET } from '../../utils/api';
import { profileConnect, profileDisconnect } from '../../services/reducer-selector-directory/profileOrderFeed/profile-order-feed-actions';
import OrderInfo from '../../components/OrderInfo/order-info';

const OrderDetailsPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const wsOrdersAll = `${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`;
        let wsProfileOrders: string | undefined;
        const jwt = localStorage.getItem('accessToken');
        if (jwt) {
            wsProfileOrders = `${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.userOrders}?token=${localStorage.getItem('accessToken')}`;
            dispatch(profileConnect(wsProfileOrders));
        }
        dispatch(orderFeedConnect(wsOrdersAll));

        return () => {
            dispatch(orderFeedDisconnect()) as unknown as void;
            dispatch(profileDisconnect()) as unknown as void;
        }
    }, []);
    return (
        <>
            <main className={styles.main}>
                <OrderInfo
                    orderPosition="center"
                    isPageSingle
                />
            </main>
        </>
    )
}

export default OrderDetailsPage;