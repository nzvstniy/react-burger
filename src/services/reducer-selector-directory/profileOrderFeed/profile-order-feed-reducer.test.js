import { profileOrderFeedReducer, initialState } from "./profile-order-feed-reducer";
import { wsProfileError, wsProfileOpen, wsProfileConnecting, wsProfileClose, wsProfileMessage } from "./profile-order-feed-actions";
import { WebSocketStatus } from "../orderFeed/order-feed-type";
import { ordersMock } from "../../../assets/mock/mock-orders";
describe("profile order feed websocket", () => {
  it("Should return the initial state", () => {
    expect(profileOrderFeedReducer(undefined, {})).toEqual(initialState);
  });

  it("Should error", () => {
    expect(profileOrderFeedReducer(initialState, wsProfileError)).toEqual({
      ...initialState,
      connectError: undefined
    })
  });

  it("Should connected", () => {
    expect(profileOrderFeedReducer(initialState, wsProfileOpen)).toEqual({
      ...initialState,
      status: WebSocketStatus.ONLINE,
    })
  });

  it("Should connecting", () => {
    expect(profileOrderFeedReducer(initialState, wsProfileConnecting)).toEqual({
      ...initialState,
      status: WebSocketStatus.CONNECTING,
    })
  });


  it("Should get message", () => {
    expect(profileOrderFeedReducer(initialState, wsProfileMessage(ordersMock))).toEqual({
      ...initialState,
      orders: ordersMock,
    })
  });


  it("Should close connect", () => {
    expect(profileOrderFeedReducer(initialState, wsProfileClose)).toEqual({
      ...initialState,
      status: WebSocketStatus.OFFLINE,
    })
  });
});