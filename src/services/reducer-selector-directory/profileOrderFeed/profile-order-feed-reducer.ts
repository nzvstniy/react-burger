import { createReducer } from "@reduxjs/toolkit";
import { WebSocketStatus, TWebSocketOrders } from "../orderFeed/order-feed-type";
import { wsProfileOpen, wsProfileClose, wsProfileConnecting, wsProfileError, wsProfileMessage } from "./profile-order-feed-actions";

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

export const profileOrderFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsProfileOpen, (state) => {
            state.status = WebSocketStatus.ONLINE;
        })
        .addCase(wsProfileClose, (state) => {
            state.status = WebSocketStatus.OFFLINE;
        })
        .addCase(wsProfileConnecting, (state) => {
            state.status = WebSocketStatus.CONNECTING;
        })
        .addCase(wsProfileError, (state, action) => {
            state.connectError = action.payload;
        })
        .addCase(wsProfileMessage, (state, action) => {
            state.orders = action.payload;
        })
})