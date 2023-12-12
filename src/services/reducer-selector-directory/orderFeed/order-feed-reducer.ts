import { createReducer } from "@reduxjs/toolkit";
import { WebSocketStatus, TWebSocketOrders } from "./order-feed-type";
import { wsOpen, wsClose, wsConnecting, wsError, wsMessage } from "./order-feed-actions";

export type TOrderFeedStore = {
    status: WebSocketStatus;
    orders: TWebSocketOrders | null;
    connectError: string;
};

const initialState: TOrderFeedStore = {
    status: WebSocketStatus.OFFLINE,
    orders: null,
    connectError: '',
};

export const orderFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsOpen, (state) => {
            state.status = WebSocketStatus.ONLINE;
        })
        .addCase(wsClose, (state) => {
            state.status = WebSocketStatus.OFFLINE;
        })
        .addCase(wsConnecting, (state) => {
            state.status = WebSocketStatus.CONNECTING;
        })
        .addCase(wsError, (state, action) => {
            state.connectError = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.orders = action.payload;
        })
})