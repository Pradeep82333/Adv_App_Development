import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    // Check if email and password are empty
    if (!gmail || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8086/api/v1/auth/authenticate', { gmail, password });
      const token = response.data.token;
      console.log('Generated Token:', token); // Log the generated token
      localStorage.setItem('token', token); // Store token in local storage
      window.location.href = '/boats'; // Redirect to the boats page upon successful login
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Invalid email or password.'); // Set error message for invalid login attempt
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <div className="input-wrapper">
          <label>
            Gmail:
            <input
              type="text"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {loginError && <p className="error-message">{loginError}</p>}
        {/* Link to registration page with the added style */}
        <p className="register-link">
          Don't have an account?{' '}
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
