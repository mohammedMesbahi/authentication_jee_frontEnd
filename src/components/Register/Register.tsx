import React from 'react';
import './Register.css';
import axios from 'axios';
import proxy from '../../configs/config';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await axios.post(
                proxy.apiUrl + proxy.register,
                {email, password},
                {headers: {'Content-Type': 'application/json'}}
            );
            setSuccessMessage(response.data);
            navigate('/login?message=' + response.data);
        } catch (error: any) {
            setErrorMessage(error.response.data);
        }
    };

    return (
        <div className="signup-container">
            <h2>Register</h2>
            {errorMessage && <div className="error">
                {errorMessage}
            </div>}
            {successMessage && <div className="success">
                {successMessage}
            </div>}
            <form>
                {/* name */}
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"
                       required value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"
                       required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required
                       value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value={isSubmitting ? "Register" : "Registering..."} disabled={isSubmitting}
                       className="submit-btn" onClick={handleRegister}/>
            </form>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
    );
};
export default Register;