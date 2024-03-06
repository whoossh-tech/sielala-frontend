import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get('http://localhost:8080/admin/acc-list');
                setUserList(response.data);
            } catch (error) {
                console.error('Error fetching user list:', error.response || error.message);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = (userId) => {
        // Implement your edit functionality here
        console.log(`Edit user with ID ${userId}`);
    };

    return (
        <div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.authorities.length > 0 ? user.authorities[0].authority : ''}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => handleEditClick(user.userId)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
