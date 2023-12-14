import { createSlice } from '@reduxjs/toolkit';
import { IOrderSuccess, IOrderFail } from './order-details-type';
import sendOrder from './order-details-request';

type TOrderDetailsSliceState = {
  order: null | IOrderSuccess;
  status: boolean;
  error: null | IOrderFail;
}

export const initialState: TOrderDetailsSliceState = {
  order: null,
  status: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
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

export default orderDetailsSlice.reducer;