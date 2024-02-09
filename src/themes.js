const defaultThemeName = 'light';

const themes = [
    {
        name : 'light',
        vars: {
            palette: {
                mode: 'light'
            }
        }
    },
    {
        name : 'dark',
        vars: {
            palette: {
                mode: 'dark'
            }
        }
    }
];

const getTheme = (themeName) => {
    const foundTheme = themes.find(theme => theme.name === themeName);
    return foundTheme ? foundTheme : themes.find(theme => theme.name === defaultThemeName);
};

export {getTheme,defaultThemeName};
