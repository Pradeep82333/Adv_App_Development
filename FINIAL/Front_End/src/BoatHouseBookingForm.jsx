import React, { useState, useEffect } from 'react';
import './BoatHouseBookingForm.css'; // Import local CSS file
import Header from './Header';
import axios from 'axios'; // Import axios for making HTTP requests
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoatHouseBookingForm = () => {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [boatHouses, setBoatHouses] = useState([]);
  const [boatHouse, setBoatHouse] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(0);
  const [currency] = useState('INR');

  useEffect(() => {
    // Fetch boat houses data from backend when the component mounts
    fetchBoatHouses();
  }, []);

  const fetchBoatHouses = async () => {
    try {
      const response = await axios.get('http://localhost:8700/api/boatHouses');
      console.log('Fetched boat houses:', response.data);
      setBoatHouses(response.data);
    } catch (error) {
      console.error('Error fetching boat houses:', error);
      toast.error('Failed to fetch boat houses. Please try again later.');
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [boatHouse, guests]);

  const calculatePrice = () => {
    const selectedBoatHouse = boatHouses.find(house => house.name === boatHouse);
    if (selectedBoatHouse) {
      const totalPrice = selectedBoatHouse.price * guests;
      setPrice(totalPrice);
    }
  };

  const handleBoatHouseChange = (e) => {
    setBoatHouse(e.target.value);
  };

  const handleCheckInDateChange = (e) => {
    const date = e.target.value;
    // Check if check-out date is set and is before the new check-in date
    if (checkOutDate && date >= checkOutDate) {
      setCheckOutDate('');
    }
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (e) => {
    const date = e.target.value;
    // Check if check-in date is set and is after the new check-out date
    if (checkInDate && date <= checkInDate) {
      setCheckInDate('');
    }
    setCheckOutDate(date);
  };

  const handleGuestsChange = (e) => {
    setGuests(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !gmail || !boatHouse || !checkInDate || !checkOutDate || !guests) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      const formData = {
        name: name,
        gmail: gmail,
        boatHouseName: boatHouse,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests,
        totalPrice: price
      };
      const response = await axios.post('http://localhost:8700/api/adds ', formData);
      console.log("Form submitted successfully!", response.data);
      toast.success('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div className="booking-page-container">
      <Header />
      <div className="booking-form-container">
        <form onSubmit={handleSubmit}>
  <label>
    Name:
    <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="name-input"
  style={{ width: '200px', textAlign: 'left' }} // or 'right'
/>

  </label>
          <label>
            Gmail:  
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
          </label>
          <label>
            Boat House Name:
            <select value={boatHouse} onChange={handleBoatHouseChange}>
              <option value="">Select Boat House</option>
              {boatHouses.map(house => (
                <option key={house.id} value={house.name}>{house.name}</option>
              ))}
            </select>
          </label>
          <label>
            Check-in Date:
            <input
              type="date"
              value={checkInDate}
              onChange={handleCheckInDateChange}
            />
          </label>
          <label>
            Check-out Date:
            <input
              type="date"
              value={checkOutDate}
              onChange={handleCheckOutDateChange}
            />
          </label>
          <label>
            Guests:
            <select value={guests} onChange={handleGuestsChange}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <div>
            <label>Total Price: {currency} {price}</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BoatHouseBookingForm;
