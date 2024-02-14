import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, Radio, FormControlLabel, TextField, Checkbox } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const BookingDetails = () => {
  const [data, setData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedBoatHouse, setSelectedBoatHouse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedGmail, setSelectedGmail] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');
  const [boatHouseNames, setBoatHouseNames] = useState([]);
  const [selectedBoatHousePrice, setSelectedBoatHousePrice] = useState(0);
  const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);

  useEffect(() => {
    fetchData();
    fetchBoatHouseNames();
  }, []);

  useEffect(() => {
    if (selectedBoatHousePrice && selectedGuests) {
      const totalPrice = selectedBoatHousePrice * selectedGuests;
      setSelectedTotalPrice(totalPrice);
    }
  }, [selectedBoatHousePrice, selectedGuests]);

  const fetchData = () => {
    axios.get('http://localhost:8700/fetchs')
      .then(response => {
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchBoatHouseNames = () => {
    axios.get('http://localhost:8700/api/boatHouses')
      .then(response => {
        const names = response.data.map(item => item.name);
        setBoatHouseNames(names);
      })
      .catch(error => {
        console.error('Error fetching boat house names:', error);
      });
  };

  const handleBoatHouseChange = (event) => {
    const name = event.target.name;
    setSelectedBoatHouse(name);
  
    axios.get(`http://localhost:8700/api/boatHouses?name=${name}`)
      .then(response => {
        const matchingBoatHouse = response.data.find(item => item.name === name);
        if (matchingBoatHouse) {
          const price = matchingBoatHouse.price;
          setSelectedBoatHousePrice(price);
        }
      })
      .catch(error => {
        console.error('Error fetching boat house price:', error);
      });
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setEditDialogOpen(true);
  };

  const handleEditFieldChange = (event) => {
    const value = event.target.value;
    setSelectedField(value);
    if (value === 'boatHouseName') {
      fetchBoatHouseNames();
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleGmailChange = (event) => {
    setSelectedGmail(event.target.value);
  };

  const handleGuestsChange = (event) => {
    const guests = parseInt(event.target.value);
    setSelectedGuests(guests);
  };

  const handleEditConfirmation = () => {
    setEditDialogOpen(false);
    let updatedBoatHouse = selectedBoatHouse;
    let updatedGuests = selectedGuests;
    let updatedBoatHousePrice = selectedBoatHousePrice;
    
    if (selectedField === 'name' || selectedField === 'gmail' || selectedField === 'checkInDate' || selectedField === 'checkOutDate') {
      // If name, gmail, check-in date, or check-out date is edited, keep previous boat house and guests values
      const previousData = data.find(item => item.id === selectedId);
      updatedBoatHouse = previousData.boatHouseName;
      updatedGuests = previousData.guests;
      updatedBoatHousePrice = selectedBoatHousePrice; // Price remains unchanged
    }
    
    // Calculate total price based on selected boat house price and number of guests
    const totalPrice = updatedBoatHousePrice * updatedGuests;
    const updatedData = {
      id: selectedId,
      name: selectedField === 'name' ? selectedName : data.find(item => item.id === selectedId).name,
      gmail: selectedField === 'gmail' ? selectedGmail : data.find(item => item.id === selectedId).gmail,
      boatHouseName: selectedField === 'boatHouseName' ? selectedBoatHouse : data.find(item => item.id === selectedId).boatHouseName,
      checkInDate: selectedField === 'checkInDate' ? selectedDate : data.find(item => item.id === selectedId).checkInDate,
      checkOutDate: selectedField === 'checkOutDate' ? selectedDate : data.find(item => item.id === selectedId).checkOutDate,
      guests: selectedField === 'guests' ? selectedGuests : data.find(item => item.id === selectedId).guests,
      totalPrice: totalPrice,
    };

    axios.put('http://localhost:8700/updates', updatedData)
      .then(response => {
        console.log('Update successful:', response);
        fetchData();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8700/deletes/${id}`)
      .then(response => {
        console.log(`Delete successful for id: ${id}`);
        // After successful deletion, you may want to update the UI by fetching the updated data
        fetchData();
      })
      .catch(error => {
        console.error(`Error deleting data for id: ${id}`, error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gmail</TableCell>
              <TableCell>Boat House Name</TableCell>
              <TableCell>Check-In Date</TableCell>
              <TableCell>Check-Out Date</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.gmail}</TableCell>
                <TableCell>{row.boatHouseName}</TableCell>
                <TableCell>{row.checkInDate}</TableCell>
                <TableCell>{row.checkOutDate}</TableCell>
                <TableCell>{row.guests}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Field</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedField} onChange={handleEditFieldChange}>
            <FormControlLabel value="name" control={<Radio />} label="Name" />
            <FormControlLabel value="gmail" control={<Radio />} label="Gmail" />
            <FormControlLabel value="checkInDate" control={<Radio />} label="Check-In Date" />
            <FormControlLabel value="checkOutDate" control={<Radio />} label="Check-Out Date" />
            <FormControlLabel value="guests" control={<Radio />} label="Guests" />
            <FormControlLabel value="boatHouseName" control={<Radio />} label="Boat House Name" />
          </RadioGroup>
          {selectedField === 'boatHouseName' && (
            <>
              {boatHouseNames.map(name => (
                <FormControlLabel
                  key={name}
                  control={<Checkbox checked={selectedBoatHouse === name} onChange={handleBoatHouseChange} name={name} />}
                  label={name}
                />
              ))}
            </>
          )}
          {(selectedField === 'checkInDate' || selectedField === 'checkOutDate') && (
            <TextField
              id="date"
              label={selectedField === 'checkInDate' ? "Check-In Date" : "Check-Out Date"}
              type="date"
              defaultValue=""
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          {(selectedField === 'name' || selectedField === 'gmail') && (
            <TextField
              id={selectedField}
              label={selectedField === 'name' ? "Name" : "Gmail"}
              defaultValue={selectedField === 'name' ? selectedName : selectedGmail}
              onChange={selectedField === 'name' ? handleNameChange : handleGmailChange}
            />
          )}
          {(selectedField === 'guests') && (
            <TextField
              id="guests"
              label="Guests"
              type="number"
              defaultValue={data.find(item => item.id === selectedId).guests}
              onChange={handleGuestsChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditConfirmation} color="primary">
            Confirm
          </Button>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookingDetails;
