import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundPhoto from '../../assets/bg-cover.png';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { NavbarAdmin } from '../../components/navbar/NavbarAdmin';
import '../../static/css/UserList.css';

const UserList = () => {
    const [users, setUserList] = useState([]);
    const navigate = useNavigate();

    const redirectToStaffRegistration = () => {
        navigate('/staff-registration');
    }

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
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <NavbarAdmin />

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        User Management</h1>
                    <div>
                        <p className="subtitle">Manage and view SieLala users data here.</p>
                    </div>
                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <br></br>

            <div className="button-field">
                <button className="button-pink"onClick={redirectToStaffRegistration}>+ Create Account</button>
            </div>

            <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        {/* Column headers */}
                        <tr>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Action</th>
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
        </div>
    );
};

export default UserList;