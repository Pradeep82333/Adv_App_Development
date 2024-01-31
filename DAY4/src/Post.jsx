import  { Component } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boatName: '',
      boatClass: '',
      boatDestination: '',
      successMessage: '',
    };
  }

  handleBoatNameChange = (event) => {
    this.setState({ boatName: event.target.value });
  };

  handleBoatClassChange = (event) => {
    this.setState({ boatClass: event.target.value });
  };

  handleBoatDestinationChange = (event) => {
    this.setState({ boatDestination: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      boatName: this.state.boatName,
      boatClass: this.state.boatClass,
      boatDestination: this.state.boatDestination,
    };

    axios
      .post('http://127.0.0.1:8085/add', data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ successMessage: 'Boat Added Successfully' });
        }
      })
      .catch((error) => {
        console.error('Error adding boat:', error);
      });
  };

  render() {
    return (
      <div>
        {this.state.successMessage && <p>{this.state.successMessage}</p>}
        <form onSubmit={this.handleSubmit} className="sign-form">
          <label className="sign-label">Boat Name</label>
          <input
            className="sign-input"
            type="text"
            value={this.state.boatName}
            onChange={this.handleBoatNameChange}
          />

          <label className="sign-label">Boat Class</label>
          <input
            className="sign-input"
            type="text"
            value={this.state.boatClass}
            onChange={this.handleBoatClassChange}
          />

          <label className="sign-label">Boat Destination</label>
          <input
            className="sign-input"
            type="text"
            value={this.state.boatDestination}
            onChange={this.handleBoatDestinationChange}
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
