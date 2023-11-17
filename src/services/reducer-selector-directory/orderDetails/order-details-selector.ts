import { StoreState } from "../../store";


export const isLoading = (state: StoreState) => state.orderDetails.status;
export const getNewOrder = (state: StoreState) => state.orderDetails.order?.order.number;