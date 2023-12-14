import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrderFail, IOrderSuccess } from "./order-details-type";
import { API } from "../../../utils/api";
import { request } from "../../../utils/request";

type TOrder = {
    order: string[];
    token: string;
};

const sendOrder = createAsyncThunk<IOrderSuccess, TOrder, { rejectValue: unknown }>('orderDetails/sendOrder', async (data, { rejectWithValue }) => {
    const { order, token } = data;

    try {
        return await request(API.endpoints.orders, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ingredients: order }),
        });
    } catch (err) {
        return rejectWithValue(err);
    }
});

export default sendOrder;