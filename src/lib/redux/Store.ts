import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth.slice';
import channelReducer from './slices/channel.slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        channel: channelReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store