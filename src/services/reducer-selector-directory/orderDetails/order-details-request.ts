import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrderFail, IOrderSuccess } from "./order-details.type";
import { API } from "../../../utils/api";

const sendOrder = createAsyncThunk<IOrderSuccess, string[], { rejectValue: IOrderFail }>('orderDetails/sendOrder', async (order) => {
    const res = await fetch(`${API.baseUrl}${API.endpoints.orders}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: order }),
    });

    if (!res.ok) {
        return Promise.reject(new Error(`Ошибка ${res.status}`));
    }

    return (await res.json()) as IOrderSuccess;
});

export default sendOrder;