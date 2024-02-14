import { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    mobno: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8086/api/v1/auth/register', formData);
      console.log('Registration Successful:', response.data);
      toast.success('Registration Successful');
      setFormData({
        name: '',
        gmail: '',
        mobno: '',
        password: '',
      });
    } catch (error) {
      console.error('Registration Failed:', error);
      toast.error('Registration Failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label className="input-wrapper input">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="input-wrapper input">
          Gmail:
          <input
            type="email"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="input-wrapper input">
          Mobile Number:
          <input
            type="text"
            name="mobno"
            value={formData.mobno}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="input-wrapper input">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register</button>
        <br />
        <br />
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
