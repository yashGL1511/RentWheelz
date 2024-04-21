from sqlalchemy.orm import Session #type:ignore


def seed(engine,Car):
    try:
        # Create a new session
        session = Session(bind=engine)
    
        # Check if any records already exist in the Car table
        if session.query(Car).first() is None:
            # List of car details
            cars = [
                {"model": "Hyundai Santa", "registration_number": "HS123", "availability": "available", "brand": "Hyundai", "price_per_hour": 10, "thumbnail": "/images/Hyndai-Santa.jpg"},
                {"model": "Fronx", "registration_number": "FX123", "availability": "available", "brand": "Fronx", "price_per_hour": 15, "thumbnail": "/images/fronx.jfif"},
                {"model": "Skoda", "registration_number": "SK123", "availability": "available", "brand": "Skoda", "price_per_hour": 20, "thumbnail": "/images/skoda.jfif"},
                {"model": "Tata Styzor", "registration_number": "TS123", "availability": "available", "brand": "Tata", "price_per_hour": 12, "thumbnail": "/images/tata-styzor.jfif"},
                {"model": "Hyundai Creta", "registration_number": "HC123", "availability": "available", "brand": "Hyundai", "price_per_hour": 18, "thumbnail": "/images/Hyndai-creta.jfif"},
            ]

            for car in cars:
                # Create a new Car instance
                new_car = Car(**car)
                # Add the new car to the session
                session.add(new_car)

            # Commit the session to save the changes
            session.commit()
    except  Exception as ex :
            print("Error : ",ex)
            raise ex
