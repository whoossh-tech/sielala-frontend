import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundPhoto from '../../assets/bg-cover.png';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { NavbarAdmin } from '../../components/navbar/NavbarAdmin';
import '../../static/css/UserList.css';
import '../../static/css/Button.css';
import Modal from 'react-modal';
import Sidebar from '../dashboard/Sidebar';
import '../../static/css/Style.css';

const UserList = () => {
    const [users, setUserList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState(false);
    const [userDeleted, setUserDeleted] = useState('');
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('user-list');

    const redirectToStaffRegistration = () => {
        navigate('/staff-registration');
    }
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get('https://sielala-backend-production.up.railway.app/admin/acc-list');
                setUserList(response.data);
            } catch (error) {
                console.error('Error fetching user list:', error.response || error.message);
            }
        };

        fetchData();
    }, [userDeleted]);

    const confirmDelete = async (e) => {
        closeModal();

        try {

            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const response = await axios.delete(`https://sielala-backend-production.up.railway.app/admin/delete/${idToBeDeleted}`);

            setUserDeleted(idToBeDeleted);
            console.log('User deleted successfully:', response.data);

            await new Promise((resolve) => setTimeout(resolve, 500));
            toast.success("User deleted successfully");
            
        } catch (error) {
            console.error('Error:', error);
            toast.error("Cannot delete user");
        }
    };

    const handleDelete = (userId) => {
        setIdToBeDeleted(userId);
        openModal();
    }

    return (  
        <body>
            <Sidebar activePage={activePage}/>

            <main style={{marginLeft: "60px"}}>
                {/* Header Start */}
                <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '150px' }}>
                    <div className="mx-8">
                        <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                        User Management</h1>
                        <div>
                            <p className="subtitle">
                                <a href='/dashboard' style={{ textDecoration: 'none' }}>
                                    <span style={{ borderBottom: '1px solid #E685AE' }}>Dashboard</span>&nbsp;
                                </a>                        
                                / User List
                            </p>
                        </div>
                    </div>
                </div>
                {/* Header Ends */}

                <div className='content-container my-4'>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />

                        <br></br>

                        <div className="button-field">
                            <button className="button-pink"onClick={redirectToStaffRegistration}>+ Create Account</button>
                        </div>

                        <div className="mb-3 mx-8" style={{ display: 'flex', justifyContent: 'center' }}>
                            <table className='user-table'>
                                <thead>
                                    {/* Column headers */}
                                    <tr>
                                        <th style={{ width: "13%", textAlign: "center"}}>Role</th>
                                        <th style={{ width: "18%", textAlign: "center"}}>Name</th>
                                        <th style={{ width: "20%", textAlign: "center"}}>Email</th>
                                        <th style={{ width: "20%", textAlign: "center"}}>Username</th>
                                        <th style={{ width: "23%", textAlign: "center"}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.role}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        {user.userId !== 1 ? (
                                            <Link to={`/user/edit/${user.userId}`}>
                                                <button className="button-green w-20">Edit</button>
                                            </Link>
                                        ) : (
                                            <button disabled className="button-green w-20">Edit</button>
                                        )}
                                        {user.userId !== 1 ? (
                                            <button className="button-red w-20" onClick={() => handleDelete(user.userId)}>Delete</button>
                                        ) : (
                                            <button disabled className="button-red w-20">Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                                </tbody>
                            </table>
                            <Modal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                id="modal-confirmation-form"
                            >
                            {/* <div className='modalBackground'>
                                <div className="modalContainer"> */}
                                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                                    <p className="text-center text-gray-700">Are you sure you want to delete user?</p>
                                    <br></br>
                                    <div>
                                        <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                                        <button className="button-green text-center" onClick={confirmDelete}>Confirm</button>
                                    </div>
                                {/* </div>
                            </div> */}
                            </Modal>
                        </div>
                    </div>
            </main>
        </body>
    );
};

export default UserList;