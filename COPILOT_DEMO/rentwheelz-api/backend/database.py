from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, ForeignKey #type: ignore
from sqlalchemy.orm import sessionmaker, relationship #type: ignore
from sqlalchemy.ext.declarative import declarative_base #type: ignore
import seed

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    # Relationship with Reservation
    reservations = relationship("Reservation", back_populates="user")

class Car(Base):
    __tablename__ = "car"

    id = Column(Integer, primary_key=True, index=True)
    model = Column(String, index=True)
    registration_number = Column(String, unique=True, index=True)
    availability = Column(String)
    brand = Column(String)
    price_per_hour = Column(Integer)
    thumbnail = Column(String)

    # Relationship with Reservation
    reservations = relationship("Reservation", back_populates="car")

class Reservation(Base):
    __tablename__ = "reservation"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    car_id = Column(Integer, ForeignKey('car.id'))
    reservation_date = Column(DateTime)
    pickup_date = Column(DateTime)
    return_date = Column(DateTime)
    num_of_travellers = Column(Integer)
    total = Column(Float)
    status = Column(String, default="pending")

    # Relationships
    user = relationship("User", back_populates="reservations")
    car = relationship("Car", back_populates="reservations")

Base.metadata.create_all(bind=engine)

# Path: rentwheelz-api/backend/seed.py
seed.seed(engine=engine,Car=Car)