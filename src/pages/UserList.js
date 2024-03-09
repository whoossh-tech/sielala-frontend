import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundPhoto from '../assets/bg-cover.png';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../static/css/UserList.css';

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

    // return (
    //     <div>
    //         <h1>User List</h1>
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Role</th>
    //                     <th>Name</th>
    //                     <th>Email</th>
    //                     <th>Username</th>
    //                     <th>Edit</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {users.map((user) => (
    //                     <tr key={user.userId}>
    //                         <td>{user.authorities.length > 0 ? user.authorities[0].authority : ''}</td>
    //                         <td>{user.name}</td>
    //                         <td>{user.email}</td>
    //                         <td>{user.username}</td>
    //                         <td>
    //                             <button onClick={() => handleEditClick(user.userId)}>
    //                                 Edit
    //                             </button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>

return (  
    <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">

        <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '120px' }}>
            <div className="text-wrapper">
                <h1 className="title">User Management</h1>
                <div className="subtitle-wrapper">
                    <p className="subtitle">Manage and view SieLala users data here.</p>
                </div>
            </div>
        </div>

        <Toaster
            position="top-center"
            reverseOrder={false}
        />

        <br></br>

        {/* <div className="relative overflow-clip w-full border border-neutral-40 rounded-lg">
            <select 
                className="appearance-none px-4 py-3 w-full focus:outline-none" 
                onChange={handleChange}
                style={{
                    backgroundColor: '#ffffff',
                    color: '#333333',
                    borderRadius: '0.375rem',
                    border: '1px solid #E3E2E6',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    padding: '0.5rem 1rem',
                }}
            >
                <option>select event</option>
                {eventData && eventData.length > 0 ? 
                    (eventData.map((event, index) => (
                        <option key={index} value={event.idEvent}>{event.eventName}</option>
                    ))) : (
                        <option value="">No events available</option>
                    )
                }
            </select>
        </div> */}
        
        <br></br>

        <div className="button-field">
            <button className="button-pink"onClick={redirectToStaffRegistration}>+ Create Account</button>
            {/* <button className="button-green" onClick={carryOutStockModal}>Carry Out Stock</button> */}

        {/* <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            id="modal-confirmation"
            
        >
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Carry Out Stock</h2>
            <p className="text-center text-gray-700">Are you sure you want to move remaining stock to the next day of event?</p>
            <br></br>
            <button className="button-red text-center" onClick={closeModal}>Cancel</button>
            <button className="button-green text-center" onClick={carryOutStock}>Confirm</button>
        </Modal> */}

        </div>
{/* 
        <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
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
</div> */}

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
