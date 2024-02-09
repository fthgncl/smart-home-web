import {Routes, Route} from 'react-router-dom';
import AppBar from "./components/AppBar";
import SignUpPage from './pages/SignUpPage';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import ConfirmEmail from "./pages/ConfirmEmail";
import Dashboard from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import {useTheme} from '@mui/material/styles';

import {useDispatch} from 'react-redux';
import {refreshUserToken} from './store/slices/accountSlice';
import Box from "@mui/material/Box";

function App() {

    const currentTheme = useTheme();

    const dispatch = useDispatch();
    dispatch(refreshUserToken());

    document.getElementsByTagName('body')[0].style.backgroundColor = currentTheme.palette.background.default;

    return (
        <Box sx={{backgroundColor:'background.default' , color:'text.primary'}}>
            <AppBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/account" element={<AccountPage/>}/>
                <Route path="/confirm-email/:userId" element={<ConfirmEmail/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
            </Routes>
        </Box>
    );
}

export default App;
