import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../services/hooks';
import { profileConnect, profileDisconnect } from '../../../services/reducer-selector-directory/profileOrderFeed/profile-order-feed-actions';
import { getProfileOrderFeed } from '../../../services/reducer-selector-directory/profileOrderFeed/profile-order-feed-selector';
import Preload from '../../../components/Preload/preload';
import { ROUTES, WEBSOCKET } from '../../../utils/api';
import { TWebSocketOrders } from '../../../services/reducer-selector-directory/orderFeed/order-feed-type';
import Orders from '../../../components/Orders/orders';

const ProfileOrdersPage = () => {
    const dispatch = useAppDispatch();
    //const wsProfileOrders = `${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.userOrders}?token=${localStorage.getItem('accessToken')}`;

    useEffect(() => {
        dispatch(profileConnect(`${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.userOrders}`));
        return () => {
            dispatch(profileDisconnect());
        }
    }, []);

    const ordersData = useAppSelector(getProfileOrderFeed);

    if (!ordersData) return <Preload />;

    const { orders, success, total, totalToday } = ordersData;
    const reverseOrders = orders.slice().reverse();
    const reverseOrdersData = { orders: reverseOrders, success, total, totalToday };

    return (
        <Orders
            ordersData={reverseOrdersData}
            dynamicRoute={`${ROUTES.user.profile}/${ROUTES.user.orders}`}
            status
        />
    );
};

export default ProfileOrdersPage;