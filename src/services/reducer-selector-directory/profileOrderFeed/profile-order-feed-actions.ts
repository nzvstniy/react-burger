import { createAction } from "@reduxjs/toolkit";
import { TWebSocketOrders } from "../orderFeed/order-feed-type";

export const profileConnect = createAction<string, 'PROFILE_ORDER_FEED_CONNECT'>('PROFILE_ORDER_FEED_CONNECT');
export const profileDisconnect = createAction('PROFILE_ORDER_FEED_DISCONNECT');
export const wsProfileConnecting = createAction('PROFILE_ORDER_WS_CONNECTING');
export const wsProfileOpen = createAction('PROFILE_ORDER_WS_OPEN');
export const wsProfileClose = createAction('PROFILE_ORDER_WS_CLOSE');
export const wsProfileError  = createAction<string, 'PROFILE_ORDER_WS_ERROR'>('PROFILE_ORDER_WS_ERROR');
export const wsProfileMessage = createAction<TWebSocketOrders, 'PROFILE_ORDER_WS_MESSAGE'>('PROFILE_ORDER_WS_MESSAGE');

export type TOrderFeedActions = 
| ReturnType<typeof profileConnect>
| ReturnType<typeof profileDisconnect>
| ReturnType<typeof wsProfileConnecting>
| ReturnType<typeof wsProfileOpen>
| ReturnType<typeof wsProfileClose>
| ReturnType<typeof wsProfileError>
| ReturnType<typeof wsProfileMessage>