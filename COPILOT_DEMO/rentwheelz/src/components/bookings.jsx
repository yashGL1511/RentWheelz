import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardActions, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginTop: '20px',
    },
    card: {
        maxWidth: 345,
        margin: '20px',
    },
    media: {
        height: 140,
    },
});

function MyBookings() {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [bookings, setBookings] = useState([]);
    const [cars, setCars] = useState([]);

    const handleComplete = async (bookingId) => {
        try {
            // replace with your actual API endpoint and method
            const booking = bookings.find(booking => booking.id === bookingId);
            const returnDate = new Date(booking.return_date);
            const today = new Date();

            if (returnDate > today) {
                alert('Error completing booking: Return date cannot be in the future');
                return;
            }

            const response = await axios.put(`http://localhost:8000/bookings/complete/${bookingId}`);
            if (response.data.status === 'success') {
                // refresh bookings
                alert('Booking completed successfully!');
            } else {
                console.error('Error completing booking:', response.data.message);
            }
        } catch (error) {
            console.error('Error completing booking:', error);
        }
    };

    const handleCancel = async (bookingId) => {
        try {
            // replace with your actual API endpoint and method
            const response = await axios.put(`http://localhost:8000/bookings/cancel/${bookingId}`);
            if (response.data.status === 'success') {
                alert('Booking cancelled successfully!');
            } else {
                console.error('Error cancelling booking:', response.data.message);
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                const response = await axios.get(`http://localhost:8000/bookings/${user.id}`);
                if (response.data) {
                    setUser(response.data.user);
                    setBookings(response.data.reservations);
                    setCars(response.data.cars);
                } else {
                    console.error('Error fetching bookings:', response.data);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };


        fetchBookings();
    }, []);

    return (
        <Container className={classes.root}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Bookings
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                User: {user.name}
            </Typography>
            <Grid container spacing={3}>
                {bookings.map((booking, index) => (
                    <Grid item xs={12} sm={6} md={4} key={booking.id}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={cars[index]?.thumbnail}
                                title={cars[index]?.model}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Car Model: {cars[index]?.model}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Car Brand: {cars[index]?.brand}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Number of Travellers: {booking.num_of_travellers}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pickup Date: {new Date(booking.pickup_date).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Reservation Date: {new Date(booking.reservation_date).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Return Date: {new Date(booking.return_date).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total: {booking.total}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Status: <span style={{ color: booking.status === 'Booked' ? 'green' : 'red' }}>{booking.status}</span>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {booking.status === 'pending' && (
                                    <>
                                        <Button variant="contained" color="primary" onClick={() => { handleComplete(booking.id) }}>
                                            Complete
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => { handleCancel(booking.id) }}>
                                            Cancel
                                        </Button>
                                    </>
                                )}
                            </CardActions>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default MyBookings;