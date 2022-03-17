import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import feedbackReducer from '../features/feedbackSlice';

export const store = configureStore({
    reducer: {
        feedback: feedbackReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

