import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrderFail, IOrderSuccess } from "./order-details-type";
import { API } from "../../../utils/api";
import { request } from "../../../utils/request";

type TOrder = {
    order: string[];
    token: string;
};

const sendOrder = createAsyncThunk<IOrderSuccess, TOrder, { rejectValue: IOrderFail }>('orderDetails/sendOrder', async (data) => {
    const { order, token } = data;

    return request(API.endpoints.orders, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ingredients: order }),
    });
});

export default sendOrder;