from fastapi import FastAPI,Depends # type: ignore
from pydantic import BaseModel # type: ignore
from sqlalchemy.orm import Session # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import database
from datetime import datetime
import logging
import pdb

# Assuming you have a Session Local
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()
origins = [
    "http://localhost:3000",  # React app
    # add any other origins that need access
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],
)
@app.get("/")
def test_backend():
    return {"message": "Backend is working"}

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    # Query all users from the database
    users = db.query(database.User).all()
    
    # Return the list of users
    return users

class LoginBase(BaseModel):
    email: str
    password: str
@app.post("/login")
def login(user: LoginBase, db: Session = Depends(get_db)):
    # Query the user from the database
    db_user = db.query(database.User).filter(database.User.email == user.email).first()

    # Check if user exists and password is correct
    if db_user and db_user.password == user.password:
        return {"status": "success", "message": "Logged in successfully","user": db_user}
    else:
        return {"status": "error", "message": "Invalid email or password"}

class UserBase(BaseModel):
    name: str
    email: str
    password: str
@app.post("/register")
def register(user: UserBase, db: Session = Depends(get_db)):
    # Check if email already exists in the database
    existing_user = db.query(database.User).filter(database.User.email == user.email).first()
    if existing_user:
        return {"status": "error", "message": "Email ID is already registered"}
    
    # Create a new User instance
    db_user = database.User(name=user.name, email=user.email, password=user.password)
    
    # Add the new user to the session
    db.add(db_user)
    
    # Commit the changes to save the user to the database
    db.commit()

    # Return the new user's details
    return {"status": "success", "message": "User registered successfully"}

@app.post("/cars")
def get_cars(db: Session = Depends(get_db)):
    # Query all cars with availability == "available" from the database
    cars = db.query(database.Car).filter(database.Car.availability == "available").all()
    
    # Return the list of cars
    return cars

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # Query the user from the database
    user = db.query(database.User).filter(database.User.id == user_id).first()
    
    # Check if user exists
    if not user:
        return {"status": "error", "message": "User not found"}
    
    # Delete the user from the database
    db.delete(user)
    db.commit()
    
    # Return success message
    return {"status": "success", "message": "User deleted successfully"}


class ReservationBase(BaseModel):
    user_id: int
    car_id: int
    reservation_date: datetime
    pickup_date: datetime
    return_date: datetime
    num_of_travellers: int
    total: float
    status: str
@app.post("/reserve")
def reserve(reservation: ReservationBase, db: Session = Depends(get_db)):
    try:
        #pdb.set_trace()
        car:database.Car = db.query(database.Car).filter(database.Car.id == reservation.car_id).first()

        if not car:
            return {"status": "error", "message": "Car not found"}
        
        # Create a new Reservation instance
        new_reservation = database.Reservation(
            user_id=reservation.user_id,
            car_id=reservation.car_id,
            reservation_date=reservation.reservation_date,
            pickup_date=reservation.pickup_date,
            return_date=reservation.return_date,
            num_of_travellers=reservation.num_of_travellers,
            total="Booked"
        )
        hour_difference = (reservation.return_date - reservation.pickup_date).total_seconds() / 3600
        new_reservation.total = hour_difference * car.price_per_hour * reservation.num_of_travellers
        logging.info(f"Total for reservation: {new_reservation.total}")
        #Add the new reservation to the session
        db.add(new_reservation)
        # Update the car's availability to "reserved"
        car.availability = "reserved"
        # Commit the session to save the changes
        db.commit()

        # Return the new reservation's details
        return {"status": "success", "message": "Reservation created successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/bookings/{user_id}")
def get_bookings_by_user_id(user_id: int, db: Session = Depends(get_db)):
    res = {}
    # Query all reservations from the database for the given user_id
    reservations = db.query(database.Reservation).filter( database.Reservation.user_id == user_id ).all()
    user  = db.query(database.User).filter(database.User.id == user_id).first()
    cars = []
    for reservation in reservations:
        car = db.query(database.Car).filter(database.Car.id == reservation.car_id).first()
        cars.append(car)
    res = {"user": user, "reservations": reservations, "cars": cars}
    # Return the list of reservations
    return res
@app.put("/bookings/complete/{booking_id}")
def complete_booking(booking_id: int, db: Session = Depends(get_db)):
    # Query the reservation from the database
    reservation = db.query(database.Reservation).filter(database.Reservation.id == booking_id).first()
    
    # Check if reservation exists
    if not reservation:
        return {"status": "error", "message": "Booking not found"}
    
    # Update the reservation's status to "complete"
    reservation.status = "complete"
    
    # Update the car's availability to "available"
    car = db.query(database.Car).filter(database.Car.id == reservation.car_id).first()
    if car:
        car.availability = "available"
    
    # Commit the changes to save the updates to the database
    db.commit()
    
    # Return success message
    return {"status": "success", "message": "Booking completed successfully"}

@app.put("/bookings/cancel/{booking_id}")
def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    # Query the reservation from the database
    reservation = db.query(database.Reservation).filter(database.Reservation.id == booking_id).first()
    
    # Check if reservation exists
    if not reservation:
        return {"status": "error", "message": "Booking not found"}
    
    # Update the reservation's status to "cancelled"
    reservation.status = "cancelled"
    
    # Update the car's availability to "available"
    car = db.query(database.Car).filter(database.Car.id == reservation.car_id).first()
    if car:
        car.availability = "available"
    
    # Commit the changes to save the updates to the database
    db.commit()
    
    # Return success message
    return {"status": "success", "message": "Booking cancelled successfully"}