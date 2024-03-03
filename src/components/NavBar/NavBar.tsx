import React from "react";
import {useNavigate} from "react-router-dom";
const NavBar = () => {
    // parse user data from local storage
    let user = JSON.parse(localStorage.getItem('user') || '{}');

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
        <nav>
            <div className="user-info">
                <div>Welcome {user.email}</div>
            </div>
            <div>
                <button type="submit" className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};
export default NavBar;