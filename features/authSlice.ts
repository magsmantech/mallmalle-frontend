import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoggedInProps {
    loggedIn: boolean,
    userId?: number,
    userName?: string,
}

const initialState: LoggedInProps = {
    loggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedInState: (state, action: PayloadAction<LoggedInProps>) => {
            state.loggedIn = action.payload.loggedIn;
        },
    },
})

export const {setLoggedInState} = authSlice.actions;

export default authSlice.reducer;
