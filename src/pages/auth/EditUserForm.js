import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../../static/css/RegisterStaffForm.css';
import '../../static/css/Button.css';
import { useNavigate, useParams } from 'react-router-dom';
import {toast, Toaster} from 'react-hot-toast';
import backgroundPhoto from '../../assets/bg-cover.png';
import { NavbarAdmin } from '../../components/navbar/NavbarAdmin';
import Sidebar from '../../pages/dashboard/Sidebar';
import '../../static/css/Style.css';

const EditUserForm = () => {
    const { idUser } = useParams();
    const url = 'https://sielala-backend-production.up.railway.app';
    const navigate = useNavigate();

    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const [role, setRole] = useState('');
    const[errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState('user-list');
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get(`${url}/admin/${idUser}`);
                const userData = response.data.data;
                console.log(userData);

                setEmail(userData.email);
                setName(userData.name);
                setRole(userData.role);
          
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email cannot be empty';
        } else if (!/^\S+@\S+$/i.test(email)) {
            newErrors.email = 'Email is not valid';
        }

        if (!name.trim()) {
            newErrors.name = 'Name cannot be empty';
        }

        if (!role) {
            newErrors.role = 'Role cannot be empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            openModal(); // Open the modal if the form is valid
        } else {
            console.log('Form validation failed');
        }
    };

    const confirmEdit = async (e) => {
        closeModal();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axios.put(`${url}/admin/edit/${idUser}`, {
                email, 
                name, 
                role: role,
            })

            console.log('User edited successfully:', response.data);
            navigate('/user-list');

            await new Promise((resolve) => setTimeout(resolve, 500))
            toast.success("User edited successfully");
        } catch (error) {
            console.error('Error editing user:', error.response || error.message);
            setErrors('Error editing user.');
            toast.error("Error editing user: Email has already been used");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <body>
            <Sidebar activePage={activePage}/>

            <main style={{ marginLeft: "60px" }}>

                {/* Header Start */}
                <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '130px' }}>
                    <div className="mx-8">
                        <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 mx-8" style={{ paddingTop: 35, textAlign: 'left', fontSize: 50 }}>
                        Edit User</h1>
                    </div>
                </div>
                {/* Header Ends */}

                <div className='content-container my-4'>                
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                    
                <form
                    className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg"
                    onSubmit={(e) => onSubmit(e)}
                >

                    <div className="flex flex-col items-stretch space-y-4 mt-6 w-full">

                        {/* email */}
                        <div className="input-form flex flex-col space-y-1">
                        <label className="input-label font-reynaldo text-left" htmlFor="email">
                            Email<span className="text-danger">*</span>
                        </label>

                        <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.email && "border-danger"}`}>
                            <input
                            id="email"
                            className="px-4 py-3 w-full focus:outline-none"
                            placeholder="Insert Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {errors.email && (
                            <span className="mt-0.5 text-danger text-xs">
                            {errors.email}
                            </span>
                        )}
                        </div>

                        {/* name */}
                        <div className="input-form flex flex-col space-y-1">
                        <label className="input-label font-reynaldo text-left" htmlFor="name">
                            Name<span className="text-danger">*</span>
                        </label>

                        <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.name && "border-danger"}`}>
                            <input
                            id="name"
                            className="px-4 py-3 w-full focus:outline-none"
                            placeholder="Insert Staff Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            />
                        </div>

                        {errors.name && (
                            <span className="mt-0.5 text-danger text-xs">
                            {errors.name}
                            </span>
                        )}
                        </div>

                        {/* role */}
                        <div className="input-form flex flex-col">
                        <label className="input-label font-reynaldo text-left" htmlFor="role">
                            Role<span className="text-danger">*</span>
                        </label>

                        <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.role && "border-danger"}`}>
                            <select
                            id="role"
                            className="appearance-none px-4 py-3 w-full focus:outline-none"
                            placeholder="Choose Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)} 
                            >
                                <option value="" disabled>Choose Role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="BISDEV">Business Development</option>
                                <option value="PARTNERSHIP">Partnership</option>
                                <option value="FINANCE">Finance</option>
                                <option value="OPERATION">Operation</option>
                            </select>
                            <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-chevron-down"
                                >
                                <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>

                        {errors.role && (
                            <span className="mt-0.5 text-danger text-xs">
                            {errors.role}
                            </span>
                        )}
                        </div>

                    </div>

                    <br></br>
                    <div>
                        <button className="button-green" onClick={() => navigate(-1)}>Cancel</button>
                        <button className="button-pink" type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        id="modal-confirmation-form"
                    >
                        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirmation</h2>
                        <p className="text-center text-gray-700">Are you sure you want to edit account?</p>
                        <br></br>
                        <div>
                            <button className="button-red text-center" onClick={closeModal}>Back</button>
                            <button className="button-green text-center" onClick={confirmEdit}>Confirm</button>
                        </div>

                    </Modal>

                    <br></br>

                </form>
                </div>
            </main>
        </body>
    );
};

export default EditUserForm;