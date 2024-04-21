import { Link, useNavigate } from 'react-router-dom';
import useAuth from './AuthContext';

function Navigation() {
  const { isLoggedIn, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };
return (
    <nav style={{ backgroundColor: 'darkslategray', padding: '10px', color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        {!isLoggedIn ? (
            <>
                <div>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'white', marginLeft: '10px', fontSize: '16px' }}>Login</Link>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Link to="/register" style={{ textDecoration: 'none', color: 'white', marginLeft: '10px', fontSize: '16px' }}>Register</Link>
                </div>
            </>
        ) : (
            <>
                <Link to="/carlist" style={{ alignContent:'start' ,textDecoration: 'none', color: 'white', marginLeft: '10px', fontSize: '16px' }}>RentWheelz</Link>
                <div style={{ marginLeft: 'auto' }}>
                    <Link to="/bookings" style={{ textDecoration: 'none', color: 'white', marginLeft: '10px', fontSize: '16px' }}>My Bookings</Link>
                    <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Logout</button>
                </div>
            </>
        )}
    </nav>
);

}

export default Navigation;