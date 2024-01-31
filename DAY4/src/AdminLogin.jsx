// AdminLogin.jsx
import { useState } from 'react';
import './AdminLogin.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform admin login logic here
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
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
        </div><Link to="/admin">
        <button type="submit">Login</button>
        </Link>
        <br />
        <br />
        <Link to="/">
       
       <button type="button" >
         Back
       </button>
       </Link>
      </form>
    </div>
  );
};

export default AdminLogin;
