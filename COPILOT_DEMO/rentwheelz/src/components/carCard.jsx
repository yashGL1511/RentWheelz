import React, { useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import Reservation from './reservation';

function CarCard({ car, user }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="cardBackStyle">
            {/* Other card content... */}
            <Button variant="contained" color="primary" onClick={handleOpen}>Reserve</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Reservation car={car} user={user} />
            </Modal>
        </div>
    );
}

export default CarCard;