import { createContext, useContext } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {

    return (
        <AccountContext.Provider value={{ test }}>
            {children}
        </AccountContext.Provider>
    );
};

export const Account = () => {
    return useContext(AccountContext);
};