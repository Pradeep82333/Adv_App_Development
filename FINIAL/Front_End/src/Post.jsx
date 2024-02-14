import React, { Component } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boatName: '',
      boatPrice: '',
    };
  }

  handleBoatNameChange = (event) => {
    this.setState({ boatName: event.target.value });
  };

  handleBoatPriceChange = (event) => {
    this.setState({ boatPrice: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.boatName || !this.state.boatPrice) {
      toast.error('Please fill in all fields');
      return;
    }

    const data = {
      name: this.state.boatName,
      price: this.state.boatPrice,
    };

    try {
      const response = await axios.post('http://localhost:8700/api/boatHouses', data);
      if (response.status === 200) {
        toast.success('Boat Added Successfully');
        // Clear input fields after successful submission
        this.setState({ boatName: '', boatPrice: '' });
      }
    } catch (error) {
      console.error('Error adding boat:', error);
      toast.error('Error adding boat');
    }
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <form onSubmit={this.handleSubmit} className="sign-form">
          <label className="sign-label">Boat Name</label>
          <input
            className="sign-input"
            type="text"
            value={this.state.boatName}
            onChange={this.handleBoatNameChange}
          />

          <label className="sign-label">Boat Price</label>
          <input
            className="sign-input"
            type="text"
            value={this.state.boatPrice}
            onChange={this.handleBoatPriceChange}
          />

          <button className="login-button" type="submit">
            ADD BOAT
          </button>

          <Link to="/admin">
            <button className="back5" type="button">
              BACK
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Post;
