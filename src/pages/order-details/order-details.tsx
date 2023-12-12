import { useEffect } from 'react';
import { useAppDispatch } from '../../services/hooks';
import { connect as orderFeedConnect, disconnect as orderFeedDisconnect } from '../../services/reducer-selector-directory/orderFeed/order-feed-actions';
import styles from './order-details.module.css';
import { WEBSOCKET } from '../../utils/api';
import { profileConnect, profileDisconnect } from '../../services/reducer-selector-directory/profileOrderFeed/profile-order-feed-actions';
import OrderInfo from '../../components/OrderInfo/order-info';
import { useMatch } from 'react-router-dom';

const OrderDetailsPage = () => {
    const dispatch = useAppDispatch();

    const isFeedPage = useMatch('/feed/:id');
    const isUserOrderPage = useMatch('profile/orders/:id');

    useEffect(() => {
        if (isFeedPage) {
            dispatch(orderFeedConnect(`${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`));
            return () => {
                dispatch(orderFeedDisconnect());
            }
        }

        if (isUserOrderPage) {
            dispatch(profileConnect(`${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.userOrders}`));
            return () => {
                dispatch(profileDisconnect());
            }
        }
    }, [])

    /*
    useEffect(() => {
        
        const wsOrdersAll = `${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`;
        let wsProfileOrders: string | undefined;
        const jwt = localStorage.getItem('accessToken');
        if (jwt) {
            wsProfileOrders = `${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.userOrders}?token=${localStorage.getItem('accessToken')}`;
            dispatch(profileConnect(wsProfileOrders));
        }
        

        dispatch(profileConnect(`${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.userOrders}`));
        dispatch(orderFeedConnect(`${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`));

        return () => {
            dispatch(orderFeedDisconnect());
            dispatch(profileDisconnect()) ;
        }
    }, []);
    */
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