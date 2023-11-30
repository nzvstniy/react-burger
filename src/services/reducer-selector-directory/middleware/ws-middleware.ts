import {
    ActionCreatorWithPayload,
    ActionCreatorWithoutPayload,
    Middleware,
} from '@reduxjs/toolkit';

import {
    connect as orderFeedConnect,
    disconnect as orderFeedDisconnect,
    wsOpen as orderFeedWsOpen,
    wsClose as orderFeedWsClose,
    wsConnecting as orderFeedWsConnecting,
    wsError as orderFeedWsError,
    wsMessage as orderFeedWsMessage,
} from '../orderFeed/order-feed-actions';

import {
    wsProfileConnecting as ProfileOrderFeedWsConnecting,
    profileConnect as ProfileOrderFeedConnect,
    profileDisconnect as ProfileOrderFeedDisconnect,
    wsProfileOpen as ProfileOrderFeedWsOpen,
    wsProfileClose as ProfileOrderFeedWsClose,
    wsProfileError as ProfileOrderFeedWsError,
    wsProfileMessage as ProfileOrderFeedWsMessage,
} from '../profileOrderFeed/profile-order-feed-actions';

import { refreshingToken } from '../user/user-thunk';
//import { requestWithRefresh } from '../user/user-thunk';
import { API } from '../../../utils/api';

export type TWsActionTypes = {
    wsConnecting: ActionCreatorWithoutPayload;
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
};

const wsMiddleware =
    (wsActions: TWsActionTypes): Middleware<{}, unknown> =>
        (store) => {
            let socket: WebSocket | null = null;
            let hasDisconnected = false;
            let url = '';
            return (next) => (action) => {
                const { dispatch } = store;
                const {
                    wsConnect,
                    wsConnecting,
                    wsDisconnect,
                    onOpen,
                    onClose,
                    onMessage,
                    onError,
                } = wsActions;

                
                const jwt = localStorage.getItem('accessToken');
                url = `${action.payload}?token=${jwt}`;
                if (wsConnect.match(action) && jwt) {
                    socket = new WebSocket(url);
                    dispatch(wsConnecting());
                }

                if (socket) {
                    socket.onopen = () => dispatch(onOpen());

                    socket.onerror = () => dispatch(onError('Some error'));

                    socket.onmessage = (evt: MessageEvent<string>) => {
                        try {
                            const { data } = evt;
                            const parsedData = JSON.parse(data);

                            if (parsedData?.message === 'Invalid or missing token') {
                                refreshingToken();
                            } else {
                                dispatch(onMessage(parsedData));
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    };

                    socket.onclose = () => dispatch(hasDisconnected ? onClose() : onOpen());

                    if (wsDisconnect.match(action)) {
                        hasDisconnected = true;
                        if (socket.readyState === 1)
                        socket.close();
                        socket = null;
                    }
                }

                next(action);
            };
        };

export const orderFeedMiddleware = wsMiddleware({
    wsConnect: orderFeedConnect,
    wsDisconnect: orderFeedDisconnect,
    wsConnecting: orderFeedWsConnecting,
    onOpen: orderFeedWsOpen,
    onClose: orderFeedWsClose,
    onError: orderFeedWsError,
    onMessage: orderFeedWsMessage,
});

export const profileOrderFeedMiddleware = wsMiddleware({
    wsConnect: ProfileOrderFeedConnect,
    wsDisconnect: ProfileOrderFeedDisconnect,
    wsConnecting: ProfileOrderFeedWsConnecting,
    onOpen: ProfileOrderFeedWsOpen,
    onClose: ProfileOrderFeedWsClose,
    onError: ProfileOrderFeedWsError,
    onMessage: ProfileOrderFeedWsMessage,
});