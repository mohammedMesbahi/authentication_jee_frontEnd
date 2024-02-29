import React, {useState} from 'react';

import axios from 'axios';
import './Signing.css';
import proxy from '../../configs/config';
import {useNavigate} from "react-router-dom";

const Signing: React.FC = () => {
    const [email, setEmail] = useState<string>('mesbahi.ed@gmail.com');
    const [password, setPassword] = useState<string>('123456');
    const [successMessage, setSuccessMessage] = useState<string>(
        new URLSearchParams(window.location.search).get('success') || ''
    );
    const [errorMessage, setErrorMessage] = useState<string>(
        new URLSearchParams(window.location.search).get('error') || ''
    );
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await axios.post(
                proxy.apiUrl + proxy.login,
                {email, password},
                {headers: {'Content-Type': 'application/json'}}
            );
            setSuccessMessage(response.data);
            navigate('/home?email=' + email);
        } catch (error: any) {
            setErrorMessage(error.response.data);
        }finally {
            setIsSubmitting(false);
        }
    };

    return (

        <div className="signin-container">
            <h2>Sign In</h2>

            {errorMessage && <div className="error">
                {errorMessage}
            </div>}

            {successMessage && <div className="success">
                {successMessage}
            </div>}

            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"
                       required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required
                       value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value={isSubmitting ? 'Signing in...' : 'Sign In'} className="submit-btn"
                       disabled={isSubmitting}
                       onClick={handleLogin}/>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default Signing;
