import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../domain/shop";

interface LoggedInProps {
    cart: Cart,
    isCartLoading: boolean,
}

const initialState: LoggedInProps = {
    cart: { summary: 0, items: [], },
    isCartLoading: true,
};

export const checkoutSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
        },
    },
})

export const {setCart} = checkoutSlice.actions;

export default checkoutSlice.reducer;
