import React from 'react';
import './AboutUs.css'; // Import CSS file for styling

const About = () => {
  return (
    <div className="about-us-container">
      {/* Left side: Image */}
      <div className="image-container">
        <img src="https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600" alt="About Us" className="about-us-image" />
      </div>
      
      {/* Right side: Text */}
      <div className="text-container">
        <h2>About Us</h2>
        <p>
        Welcome to Boat House Booking!
        </p><p><br></br>
At Boat House Booking, we believe in the joy of giving. Our mission is to provide you with an unforgettable experience, whether it's for a special occasion or just to brighten someone's day. We offer a curated selection of unique Boats, carefully chosen to delight and inspire.
</p><p><br></br>
With a focus on quality, creativity, and convenience, Boat House strives to make every moment memorable. Our team is dedicated to helping you find the perfect choosing boats, no matter the recipient or the occasion.
</p><p><br></br>
Founded with a passion for spreading Joy, Boat House is more than just a House — it's a destination for thoughtful gestures and heartfelt expressions. Join us in celebrating the art of giving and make every moment unforgettable with our House.
</p><p><br></br>
Thank you for choosing Boat House Booking, Enjoy Your Boating.
        </p>
      </div>
    </div>
  );
}

export default About;