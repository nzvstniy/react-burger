import { createSlice } from '@reduxjs/toolkit';
import { IOrderSuccess, IOrderFail } from './order-details-type';
import sendOrder from './order-details-request';

type TOrderDetailsSliceState = {
  order: null | IOrderSuccess;
  status: boolean;
  error: null | IOrderFail;
}

const initialState: TOrderDetailsSliceState = {
  order: null,
  status: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    SAVE_ORDER_DETAILS(state, { payload }) {
      state.order = payload;
    },

    RESET_ORDER_DETAILS: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, { payload }) => {
        state.status = false;
        state.order = payload;
      })
      .addCase(sendOrder.rejected, (state, { payload }) => {
        state.status = false;
        state.error = payload as IOrderFail;
      })

      .addDefaultCase((state) => state);
  },
});

export const { SAVE_ORDER_DETAILS, RESET_ORDER_DETAILS } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;