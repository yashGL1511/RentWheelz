# Car Rental Service

This is a car rental service application built with React, FastAPI, and SQLite.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Python 3.7+
- SQLite

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/car-rental-service.git
    ```

2. Install the Python dependencies:
    ```
    pip install -r requirements.txt
    ```

3. Install the Node.js dependencies:
    ```
    cd client
    npm install
    ```

4. Start the FastAPI server:
    ```
    uvicorn main:app --reload
    ```

5. In a new terminal window, start the React development server:
    ```
    cd client
    npm start
    ```

The application should now be running at `http://localhost:3000`.

## Features

- User registration and login
- Listing of available cars
- Making and managing reservations
- Completing or cancelling bookings

## Built With

- [React](https://reactjs.org/) - The web framework used
- [FastAPI](https://fastapi.tiangolo.com/) - The backend framework used
- [SQLite](https://www.sqlite.org/index.html) - The database used

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
