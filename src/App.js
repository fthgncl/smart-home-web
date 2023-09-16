import './App.css';
import {Routes, Route} from 'react-router-dom';
import AppBar from "./components/AppBar";
import SignUpPage from './pages/SignUpPage';
import HomePage from "./pages/HomePage";

function App() {
    return (
        <div className="App">
            <AppBar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </div>
    );
}

export default App;
