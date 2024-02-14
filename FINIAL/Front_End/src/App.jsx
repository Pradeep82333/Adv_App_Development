// src/App.jsx

//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import BoatHouseBookingForm from './BoatHouseBookingForm';
import Blog from './Blog';
import About from './About';
import AdminPage from './AdminPage';
import Post from './Post';
import Boats1 from './Boats1';
//import List from './List';
import AdminLogin from './AdminLogin';
import SimpleTable from './SimpleTable';
import BookingDetails from './BookingDetails';

const App = () => {
  return (
    <Router> 
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Home />} />
    <Route path="/boat" element={<BoatHouseBookingForm />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/about" element={<About />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/addboats" element={<Post />} />
    <Route path="/boats" element={<Boats1 />} />
    <Route path="/adminlogin" element={<AdminLogin />} />
    <Route path="/table" element={<SimpleTable />} />
    <Route path="/booking" element={<BookingDetails />} />

  </Routes>
</Router>
  );
};

export default App;
