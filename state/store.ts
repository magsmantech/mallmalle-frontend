import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import feedbackReducer from '../features/feedbackSlice';
import checkoutReducer from '../features/checkoutSlice';
import api from '../features/api';

export const getToken = () => localStorage.getItem('access_token');

export const store = configureStore({
    reducer: {
        feedback: feedbackReducer,
        auth: authReducer,
        checkout: checkoutReducer,
        // Add the generated reducer as a specific top-level slice
        [api.reducerPath]: api.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

