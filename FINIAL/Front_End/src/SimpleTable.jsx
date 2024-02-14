import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SimpleTable = () => {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editField, setEditField] = useState('name');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8700/api/boatHouses')
      .then(response => {
        const sortedData = response.data.sort((a, b) => a.id - b.id); // Sort by ID in ascending order
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleEdit = (id, currentName, currentPrice) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleEditFieldChange = (event) => {
    setEditField(event.target.value);
  };

  const handleConfirmation = () => {
    setDialogOpen(false);
    const currentData = data.find(item => item.id === selectedId);
    const currentValue = editField === 'name' ? currentData.name : currentData.price;
    const newValue = prompt(`Enter the new ${editField}:`, currentValue);
    if (newValue !== null) {
      const newData = data.map(item => {
        if (item.id === selectedId) {
          return editField === 'name' ? { ...item, name: newValue } : { ...item, price: newValue };
        }
        return item;
      });
      setData(newData);
      const updatedValue = editField === 'name' ? { name: newValue, price: currentData.price } : { name: currentData.name, price: newValue };
      axios.put(`http://localhost:8700/api/boatHouses/${selectedId}`, updatedValue)
        .then(() => {
          // If the update is successful, fetch the updated data
          fetchData();
          toast.success('Edited successfully');
        })
        .catch(error => {
          console.error('Error updating record:', error);
          toast.error('Failed to edit the record');
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      axios.delete(`http://localhost:8700/api/boatHouses/${id}`)
        .then(() => {
          // If the deletion is successful, fetch the updated data
          fetchData();
          toast.success('Deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting record:', error);
          toast.error('Failed to delete the record');
        });
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Boat House Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row.id, row.name, row.price)}>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <RadioGroup value={editField} onChange={handleEditFieldChange} row>
            <FormControlLabel value="name" control={<Radio />} label="Boat House Name" />
            <FormControlLabel value="price" control={<Radio />} label="Price" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation} color="primary">
            Confirm
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default SimpleTable;
