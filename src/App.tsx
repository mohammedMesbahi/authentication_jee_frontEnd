import React from 'react';
import './App.css';
import Signing from "./components/Login/Signing";
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/DashBoard";
function App() {
    return (
        <Router>
                <Routes>
                    <Route path={"/login"} element={<Signing />} />
                    <Route path={"/"} element={<Signing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
        </Router>
    );
}

export default App;
