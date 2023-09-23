import './css/App.css';
import {Routes, Route} from 'react-router-dom';
import AppBar from "./components/AppBar";
import SignUpPage from './pages/SignUpPage';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import ConfirmEmail from "./pages/ConfirmEmail";

import { useDispatch } from 'react-redux';
import { refreshUserToken } from './store/slices/accountSlice';

function App() {

    const dispatch = useDispatch();
    dispatch(refreshUserToken());

    return (
        <div className="App">
            <AppBar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/account" element={<AccountPage/>} />
                <Route path="/confirm-email/:userId" element={<ConfirmEmail/>} />
            </Routes>
        </div>
    );
}

export default App;
