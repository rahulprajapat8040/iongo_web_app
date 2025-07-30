// store/slices/authSlice.ts

import { UserInterface } from '@/lib/interfaces/user.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    isLoggedIn: boolean;
    user: UserInterface | null;
}

const initialState: AuthState = {
    accessToken: null,
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isLoggedIn = true;
        },
        setUser: (state, action: PayloadAction<UserInterface>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
