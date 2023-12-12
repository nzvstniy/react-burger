import { createAction } from "@reduxjs/toolkit";
import { TWebSocketOrders } from "./order-feed-type";

export const connect = createAction<string, 'ORDER_FEED_CONNECT'>('ORDER_FEED_CONNECT');
export const disconnect = createAction('ORDER_FEED_DISCONNECT');
export const wsOpen = createAction('ORDER_WS_OPEN');
export const wsClose = createAction('ORDER_WS_CLOSE');
export const wsConnecting = createAction('ORDER_WS_CONNECTING');
export const wsError = createAction<string, 'ORDER_WS_ERROR'>('ORDER_WS_ERROR');
export const wsMessage = createAction<TWebSocketOrders, 'ORDER_WS_MESSAGE'>('ORDER_WS_MESSAGE');

export type TOrderFeedActions = 
| ReturnType<typeof connect> 
| ReturnType<typeof disconnect> 
| ReturnType<typeof wsOpen> 
| ReturnType<typeof wsClose> 
| ReturnType<typeof wsConnecting> 
| ReturnType<typeof wsError> 
| ReturnType<typeof wsMessage> 
