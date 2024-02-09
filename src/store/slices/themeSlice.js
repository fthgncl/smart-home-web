import {createSlice} from '@reduxjs/toolkit';
import {localStorageThemeName} from "../../config";
import {getTheme,defaultThemeName} from '../../themes';

const themeName = localStorage.getItem(localStorageThemeName) || defaultThemeName;

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme :getTheme(themeName)
    },
    reducers: {
        setTheme(state, action) {
            state.theme = getTheme(action.payload);
            localStorage.setItem(localStorageThemeName, state.theme.name);
        }
    }
});

export const {setTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
