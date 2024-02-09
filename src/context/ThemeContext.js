import {createContext, useContext} from 'react';
import {useSelector} from "react-redux";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "@mui/material/styles";

const ThemeContext = createContext(undefined);

export const AppThemeProvider = ({children}) => {

    const ThemeProps = useSelector(state => state.theme);
    const theme = ThemeProps.theme.vars;

    return (
        <ThemeContext.Provider value={{ThemeProps}}>
            <ThemeProvider theme={createTheme(theme)}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const Theme = () => {
    return useContext(ThemeContext);
};