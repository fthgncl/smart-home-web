import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import { AccountProvider } from './context/AccountContext';

import './css/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AccountProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AccountProvider>
    </Provider>
);
