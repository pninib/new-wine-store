import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../components/order/orderSlice";
import productSlice from "../components/wine/productSlice.js";
import userReducer from "../components/user/userSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productSlice,
        order: orderSlice
    },
});