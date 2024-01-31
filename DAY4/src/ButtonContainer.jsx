//import React from 'react';
import { Link } from "react-router-dom";

const ButtonContainer = () => {
  // Define event handlers
  const handleAddBoats = () => {
    // Logic for adding a boat
  };

  const handleViewBoats = () => {
    // Logic for viewing boats
  };

  const handleEditBoats = () => {
    // Logic for editing boats
  };

  const handleDeleteBoats = () => {
    // Logic for deleting boats
  };

  return (
    <div className="button-container" style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleAddBoats}
      >
        <Link to="/addboats" style={linkStyle}>ADD BOATS</Link>
      </button>
      <button
        style={buttonStyle}
        onClick={handleViewBoats}
      >
        <Link to="/viewboats" style={linkStyle}>VIEW BOATS</Link>
      </button>
      <button
        style={buttonStyle}
        onClick={handleEditBoats}
      >
        <Link to="/editboats" style={linkStyle}>EDIT BOATS</Link>
      </button>
      <button
        style={buttonStyle}
        onClick={handleDeleteBoats}
      >
        <Link to="/deleteboats" style={linkStyle}>DELETE BOATS</Link>
      </button>
    </div>
  );
};

// CSS styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #4CAF50', // Border style
  borderRadius: '5px',
  padding: '20px', // Increase padding to increase container size
  width: 'fit-content', // Adjust width to fit the content
  height: 'auto', // Increase the height as needed
};

const buttonStyle = {
  padding: '15px 30px', // Increase padding to increase button size
  margin: '0 10px', // Adjust margins as needed
  backgroundColor: '#008CBA', // Change button background color
  color: 'white',
  border: '2px solid #008CBA', // Change button border color
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontSize: '18px', // Increase font size for button text
  minWidth: '150px', // Set minimum width for the buttons
  textAlign: 'center', // Center the text inside the button
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

export default ButtonContainer;
