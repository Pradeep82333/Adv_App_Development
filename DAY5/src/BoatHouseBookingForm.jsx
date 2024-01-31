import { useState } from 'react';
import './BoatHouseBookingForm.css'; // Import local CSS file
import Header from './Header';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
};

const BoatHouseBookingForm = () => {
  const [boatHouse, setBoatHouse] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1); // Initial value for guests
  const [price, setPrice] = useState(0); // Initial price
  const [currency] = useState('INR'); // Currency
  const [errorMessage, setErrorMessage] = useState('');

  // Define prices for each boat house
  const boatHousePrices = {
    "Boat House A": 15000,
    "Boat House B": 20000,
    "Boat House C": 25000
    // Add more boat houses and their prices as needed
  };

  // Define your price calculation logic
  const calculatePrice = () => {
    // Calculate the total price based on the selected boat house price and number of guests
    const totalPrice = boatHousePrices[boatHouse] * guests;
    setPrice(totalPrice);
  };

  const handleBoatHouseChange = (e) => {
    setBoatHouse(e.target.value);
    calculatePrice();
  };

  const handleCheckInDateChange = (e) => {
    const selectedDate = e.target.value;
    // Ensure selected date is before the check-out date
    if (!checkOutDate || selectedDate < checkOutDate) {
      setCheckInDate(selectedDate);
      calculatePrice();
    } else {
      // If check-in date is after check-out date, set check-out date to null or default value
      setCheckOutDate('');
      setCheckInDate(selectedDate);
      calculatePrice();
    }
  };

  const handleCheckOutDateChange = (e) => {
    const selectedDate = e.target.value;
    // Ensure selected date is after the check-in date
    if (!checkInDate || selectedDate > checkInDate) {
      setCheckOutDate(selectedDate);
      calculatePrice();
    } else {
      // If check-out date is before check-in date, set check-in date to null or default value
      setCheckInDate('');
      setCheckOutDate(selectedDate);
      calculatePrice();
    }
  };

  const handleGuestsChange = (e) => {
    const newGuests = parseInt(e.target.value);
    setGuests(newGuests);
    // Recalculate the price when the number of guests changes
    const totalPrice = boatHousePrices[boatHouse] * newGuests;
    setPrice(totalPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field is empty before submission
    if (boatHouse && checkInDate && checkOutDate && guests) {
      // Handle form submission here
      console.log("Form submitted successfully!");
      // Clear any previous error message
      setErrorMessage('');
    } else {
      // If any field is empty, display an error message
      setErrorMessage('Please fill out all fields.');
      console.error("All fields are required.");
    }
  };

  return (
    <div className="booking-page-container">
      <Header />
      <div className="booking-form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Boat House Name:
            <select value={boatHouse} onChange={handleBoatHouseChange}>
              <option value="">Select Boat House</option>
              <option value="Boat House A">Boat House A</option>
              <option value="Boat House B">Boat House B</option>
              <option value="Boat House C">Boat House C</option>
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
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </div>
  );
};

export default BoatHouseBookingForm;
