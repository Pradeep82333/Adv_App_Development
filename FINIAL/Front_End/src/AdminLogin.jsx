import { useState } from 'react';
import './AdminLogin.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    // Check if username and password are 'admin'
    if (username === 'admin' && password === 'admin') {
      toast.success('Login successful!');
      setLoggedIn(true); // Set loggedIn state to true if the username and password are correct
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <br />
        <br />
        {loggedIn ? ( // Render redirect link if logged in
          <Link to="/admin">
            <button>Go to Admin Page</button>
          </Link>
        ) : null}
        <Link to="/">Back</Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
