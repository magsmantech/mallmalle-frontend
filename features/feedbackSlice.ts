import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type FeedbackTypes = 'error' | 'success' | 'info';
interface feedbackState {
    show: boolean,
    type?: FeedbackTypes,
    text?: string,
    title?: string,
}

const initialState: feedbackState = {
    show: false,
    type: 'info',
};

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        showFeedback: (state, action: PayloadAction<feedbackState>) => {
            state.show = action.payload.show;
            state.type = action.payload.type || 'info';
            state.text = action.payload.text;
            state.title = action.payload.title;
            
        },
        hideFeedback: (state, action: PayloadAction<feedbackState>) => {
            state.show = action.payload.show;
        },
    },
})

export const {showFeedback, hideFeedback} = feedbackSlice.actions;

export default feedbackSlice.reducer;
