import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from '@material-ui/core';
import Reservation from './reservation';
function CarsList() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const handleOpen = (car_id) => {
    setSelectedCarId(car_id);  
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.post('http://localhost:8000/cars');
        console.log(response.data)
        if (response.data) {
          setCars(response.data);
        } else {
          console.error('Error fetching cars:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const carCardStyle = {
    position: 'relative',
    width: '200px',
    height: '250px',
    perspective: '1000px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const cardInnerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
  };

  const cardFaceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '5px',
    padding: '3px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const cardFrontStyle = {
    ...cardFaceStyle,
    backgroundColor: '#bbb',
    color: 'black',
  };

  const cardBackStyle = {
    ...cardFaceStyle,
    backgroundColor: '#2980b9',
    color: 'white',
    transform: 'rotateY(180deg)',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '5px',
  };

  return (
    <>
    <Modal
                open={open}
                onClose={handleClose}
            >
                <Reservation handleClose={handleClose} carId={selectedCarId} user={JSON.parse(sessionStorage.getItem('user'))} />
            </Modal>
    <div style={cardContainerStyle}>
      {cars.map(car => (
        <div
          key={car.id}
          style={carCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.firstChild.style.transform = 'rotateY(180deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.firstChild.style.transform = '';
          }}
        >
          <div style={cardInnerStyle}>
            <div style={cardFrontStyle}>
              <img src={car.thumbnail} alt={car.model} style={{width: '100%', height: '50%' }} />
              <h2>{car.model}</h2>
              <p>{car.brand}</p>
            </div>
            <div style={cardBackStyle}>
              <h2>{car.model}</h2>
              <p>Registration #: {car.registration_number}</p>
              <p>Price per Hour: {car.price_per_hour} $</p>
              <p><Button variant="contained" color="primary" onClick={()=>{handleOpen(car.id)}}>Reserve</Button></p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default CarsList;

