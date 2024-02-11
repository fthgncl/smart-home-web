import { createContext, useContext } from 'react';
import { useSelector } from "react-redux";

const AccountContext = createContext(undefined);

export const AccountProvider = ({ children }) => {

    const accountProps = useSelector((state) => state.account );

    return (
        <AccountContext.Provider value={{ accountProps }}>
            {children}
        </AccountContext.Provider>
    );
};

export const Account = () => {
    return useContext(AccountContext);
};