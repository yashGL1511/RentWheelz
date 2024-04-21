import { BrowserRouter as Router, Routes, Route, Link,useNavigate,Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/home';
import React from 'react';
import useAuth,{AuthProvider} from './components/Auth/AuthContext';
import Navigation from './components/Auth/Navigation';
import CarsList from './components/carList';
import Reservation from './components/reservation';
import MyBookings from './components/bookings';
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};



function App() {
  return (
      <AuthProvider>
      <Router>
        <div style={{ backgroundColor: 'black', color: 'white' ,minHeight:'100vh'}}>
          <Navigation />
          <Routes>  
            <Route path="/carlist" element={ <ProtectedRoute><CarsList /> </ProtectedRoute>} />
            <Route path="/register" element={<Register /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/bookings" element={<ProtectedRoute><MyBookings /> </ProtectedRoute>} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>
      </AuthProvider>
  );
}

export default App;