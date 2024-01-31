// src/Login.jsx
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="login-page-container">
    <div className="login-container">
      <div className="input-wrapper">
        <label>
          Email:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div className="input-wrapper">
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <Link to="/boats" className="login-button">
       
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      </Link>

      {/* Link to registration page with the added style */}
      <p className="register-link">
        Dont have an account?{' '}
        <Link to="/register">Register</Link>
      </p>
      <p className="register-link">
        Are You An Admin?{' '}
        <Link to="/adminlogin">Admin-Login</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
