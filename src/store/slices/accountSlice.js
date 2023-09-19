import {createSlice} from '@reduxjs/toolkit';
import {localStorageTokenName} from "../../config";
import {decodeToken, isExpired} from "react-jwt";

const token = localStorage.getItem(localStorageTokenName) || '';

const courseSlice = createSlice({
    name: 'account',
    initialState: {
        token: {
            data: decodeToken(token),
            active: !isExpired(token)
        }
    },
    reducers: {

        userConnected(state, action) {
            const token = action.payload.token;
            state.token = token;
            localStorage.setItem(localStorageTokenName, token);
        },

        userDisconnected(state, action) {
            state.token = '';
            localStorage.removeItem(localStorageTokenName);
        }
    },
});

export const {userConnected, userDisconnected} = courseSlice.actions;
export const accountReducer = courseSlice.reducer;
