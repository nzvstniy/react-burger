import { WebSocketStatus } from "../orderFeed/order-feed-type";
import { ordersMock } from "../../../assets/mock/mock-orders";
import { wsError, wsClose, wsConnecting, wsMessage, wsOpen } from "./order-feed-actions";
import { initialState, orderFeedReducer } from "./order-feed-reducer";

describe("order feed websocket", () => {
    it("Should return the initial state", () => {
      expect(orderFeedReducer(undefined, {})).toEqual(initialState);
    });
  
    it("Should error", () => {
      expect(orderFeedReducer(initialState, wsError)).toEqual({
        ...initialState,
        connectError: undefined
      })
    });
  
    it("Should connected", () => {
      expect(orderFeedReducer(initialState, wsOpen)).toEqual({
        ...initialState,
        status: WebSocketStatus.ONLINE,
      })
    });
  
    it("Should connecting", () => {
      expect(orderFeedReducer(initialState, wsConnecting)).toEqual({
        ...initialState,
        status: WebSocketStatus.CONNECTING,
      })
    });
  
  
    it("Should get message", () => {
      expect(orderFeedReducer(initialState, wsMessage(ordersMock))).toEqual({
        ...initialState,
        orders: ordersMock,
      })
    });
  
  
    it("Should close connect", () => {
      expect(orderFeedReducer(initialState, wsClose)).toEqual({
        ...initialState,
        status: WebSocketStatus.OFFLINE,
      })
    });
  });