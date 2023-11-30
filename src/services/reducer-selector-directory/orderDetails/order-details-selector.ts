import { RootState } from "../../store";


export const isLoading = (state: RootState) => state.orderDetails.status;
export const getNewOrder = (state: RootState) => state.orderDetails.order?.order.number;