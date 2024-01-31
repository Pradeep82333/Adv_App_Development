import React from "react";
import { Typography, AppBar, Toolbar } from "@mui/material";
import { Link } from 'react-router-dom';

const Header = () => {
  const handleSignOut = () => {
    // Implement your signout logic here
    console.log("Signing out...");
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontSize: "2.1rem", textAlign: "center", fontFamily: '"Brush Script MT", cursive' }}>
            BoatBooking.Com
          </Typography>
          <div style={{ display: "flex" }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
                fontFamily: '"Brush Script MT", cursive',
                marginRight: "75px", // Add margin to separate links
                marginLeft:"1000px"
              }}
            >
              <Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>
                About Us
              </Link>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
                fontFamily: '"Brush Script MT", cursive',
              }}
            >
              <Link to="/blog" style={{ color: "inherit", textDecoration: "none" }}>
                Blog
              </Link>
            </Typography>
          </div>
          <Link to="/">
          <Typography
            variant="body2"
            sx={{
              fontSize: "20px",
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
              fontFamily: '"Brush Script MT", cursive',
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
