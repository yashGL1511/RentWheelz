// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the Register component
const Register = () => {
    // Define state variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Make a POST request to the backend API
        try {
            const response = await axios.post('http://localhost:8000/register', {
                name: name,
                email: email,
                password: password
            });

            if (response.data && response.data.status === 'error') {
                alert(response.data.message);
            }else if(response.data && response.data.status === 'success'){
                alert(response.data.message);
                alert("Now login to continue...");
                navigate('/login');
            }else{
                alert('An error occurred. Please try again later.');
            }

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        setEmail('');
        setPassword('');
        setName('');
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', height: '91vh' }}>
            <div style={{ width: '400px', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', backgroundColor: 'darkcyan' }}>
                <h1 style={{ textAlign: 'center' }}>Register User</h1>
                <form method='post' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ marginBottom: '10px' }}>
                        Name:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ marginLeft: '10px' }} />
                    </label>
                    <label style={{ marginBottom: '10px' }}>
                        Email:
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ marginLeft: '10px' }} />
                    </label>
                    <label style={{ marginBottom: '10px' }}>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ marginLeft: '10px' }} />
                    </label>
                    <input type="submit" value="Register" style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
                </form>
            </div>
        </div>
    );
};

// Export the Register component
export default Register;