import { configureStore } from '@reduxjs/toolkit';
import { accountReducer } from './slices/accountSlice';
import { themeReducer } from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        theme: themeReducer
    }
});
