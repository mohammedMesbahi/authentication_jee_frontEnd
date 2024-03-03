import React , {useState} from 'react';
import './Home.css';
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';
const Home: React.FC = () => {
    // take the email from the query string
    const [email, setEmail] = useState<string>(
        new URLSearchParams(window.location.search).get('email') || ''
    ); // 1
    const navigate = useNavigate();

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            navigate('/login' + '?success=You have been logged out');
        } catch (error: any) {
            console.error(error);
        }
    }
    return (
        <div className="home-container">
            <nav>
                <div className="user-info">
                    <div>Welcome {email}</div>
                </div>
                <div>
                        <button type="submit"  className="logout-btn" onClick={handleLogout} >
                            Logout
                        </button>
                </div>
            </nav>
        </div>
    );
}
export default Home;