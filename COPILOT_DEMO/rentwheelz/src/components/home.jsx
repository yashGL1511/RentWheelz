import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);
    async function handleDeleteUser(userId){
        try {
            await axios.delete(`http://localhost:8000/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <>
        <div style={{alignItems: 'center', height: '90vh' }}>
            <h1 style={{ textAlign:'center'}}>Registered Users [{users.length}]:</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white'}}>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px' }}>
                {users.map((user, index) => (
                    <li key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '25px' }}>
                        <strong>Name:</strong> {user.name} <br />
                        <strong>Email:</strong> {user.email}
                        <button style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }} onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            
        </div>
        </div>
        </>
    );

};

export default Home;