import { createSlice } from '@reduxjs/toolkit';

export interface NotificationInfo {
    type: null | 'success' | 'error' | 'popup' | 'loading';
    message: null | string;
}

const initialState: NotificationInfo = {
    type: null,
    message: null,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            const {
                type,
                message,
            }: {
                type: 'success' | 'error' | 'popup' | 'loading';
                message: string;
            } = action.payload;

            state = {
                ...state,
                type,
                message,
            };

            return state;
        },
        clearNotification: (state) => {
            state.type = null;
            state.message = null;
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state: any) => state.notification;

export default notificationSlice.reducer;
