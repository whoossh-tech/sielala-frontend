import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundPhoto from '../../assets/bg-cover.png';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { NavbarAdmin } from '../../components/navbar/NavbarAdmin';
import '../../static/css/UserList.css';
import '../../static/css/Button.css';
import Modal from 'react-modal';

const UserList = () => {
    const [users, setUserList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState(false);
    const [userDeleted, setUserDeleted] = useState('');
    const navigate = useNavigate();

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
            
            const response = await axios.delete(`http://localhost:8080/admin/delete/${idToBeDeleted}`);

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
        <div className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <NavbarAdmin />

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                        User Management</h1>
                    {/* <div>
                        <p className="subtitle">Manage and view SieLala users data here.</p>
                    </div> */}
                    <div>
                        <p className="subtitle">
                            <a href='/dashboard' style={{ textDecoration: 'none' }}>
                                <span style={{ borderBottom: '1px solid #E685AE' }}>Dashboard</span>&nbsp;
                            </a> 
                            / User Management
                        </p>
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

            <div className="mb-3 mx-8" style={{ display: 'flex', justifyContent: 'center' }}>
                <table className='user-table'>
                    <thead>
                        {/* Column headers */}
                        <tr>
                            <th style={{ textAlign: "center"}}>Role</th>
                            <th style={{ textAlign: "center"}}>Name</th>
                            <th style={{ textAlign: "center"}}>Email</th>
                            <th style={{ textAlign: "center"}}>Username</th>
                            <th style={{ textAlign: "center"}}>Action</th>
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
                            {/* <button onClick={() => handleEditClick(user.userId)}>
                                Edit
                            </button> */}
                            <Link to={`/user/edit/${user.userId}`}>
                                <button className="button-green w-32">Edit</button>
                            </Link>
                            <button className="button-red w-32" onClick={() => handleDelete(user.userId)}>Delete</button>
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
    );
};

export default UserList;