import './App.css';
import {Routes, Route} from 'react-router-dom';
import AppBar from "./components/AppBar";
import SignUpPage from './pages/SignUpPage';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import { Account } from "./context/AccountContext";

function App() {

    console.log(Account());

    return (
        <div className="App">
            <AppBar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
        </div>
    );
}

export default App;
