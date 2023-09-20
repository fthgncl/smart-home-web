import {createSlice} from '@reduxjs/toolkit';
import {apiAddress, localStorageTokenName} from "../../config";
import {decodeToken, isExpired} from "react-jwt";
import axios from "axios";

const token = localStorage.getItem(localStorageTokenName) || '';

const accountSlice = createSlice({
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

        userDisconnected(state) {
            state.token = '';
            localStorage.removeItem(localStorageTokenName);
        },

        refreshUserToken(state, action) {
            axios.post(`${apiAddress}/updateToken`, {token})
                .then(response => response.data)
                .then(data =>{
                    if(data.status)
                        localStorage.setItem(localStorageTokenName, data.newToken);
                })
                .catch(console.error);
        }
    },
});

export const {userConnected, userDisconnected, refreshUserToken} = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
