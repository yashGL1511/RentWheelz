import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Paper, Typography } from '@material-ui/core';

function Reservation({handleClose, carId, user}) {
    const [reservation, setReservation] = useState({
        user_id: '',
        car_id: '',
        reservation_date: '',
        pickup_date: '',
        return_date: '',
        num_of_travellers: '',
        total:'',
        status: ''
    });

    const handleChange = (event) => {
        setReservation({...reservation, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleClose();
        reservation.reservation_date = new Date().toISOString();
        reservation.user_id = user.id;
        reservation.car_id = carId;
        reservation.total = 0;
        reservation.status = '';
        console.log(reservation);
        // Convert dates to JavaScript Date objects for comparison
        const pickupDate = new Date(reservation.pickup_date);
        const returnDate = new Date(reservation.return_date);

        // Check if pickup date is later than return date
        if (pickupDate > returnDate) {
            alert('Pickup date cannot be later than return date.');
            return;  // Prevent form submission
        }

        try {
            const response = await axios.post('http://localhost:8000/reserve', reservation);
            if(response.data.status === 'success'){
                alert(response.data.message);
                handleClose();
            }else{
                alert(response.data.message);
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Paper style={{ padding: 16 }}>
                    <Typography variant="h4">Reservation</Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="pickup_date"
                            label="Pickup Date"
                            type="datetime-local"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="return_date"
                            label="Return Date"
                            type="datetime-local"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="num_of_travellers"
                            label="Number of Travellers"
                            type="number"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            required
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">Reserve</Button>
                        </div>
                        {/* <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button> */}
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Reservation;