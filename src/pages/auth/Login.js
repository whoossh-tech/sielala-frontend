import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../../static/css/RegisterStaffForm.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/background.svg';
import '../../static/css/Login.css'

const Login = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const[errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); 

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Username cannot be empty';
        }

        if (!password.trim()) {
            newErrors.password = 'Password cannot be empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onRegister = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            openModal(); // Open the modal if the form is valid
        } else {
            console.log('Form validation failed');
        }
    };

    const confirmRegistration = async (e) => {
        closeModal();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                username,
                password
            })

            const { jwt, user } = response.data;
            localStorage.setItem('token', jwt);

            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

            console.log('Logged in successfully:', user);

            // Redirect admin to user list page
            // if (user.authorities.some(authority => authority.authority === 'ADMIN')) {
            //     navigate('/user-list');
            // } else {
            //     navigate('/user-list');
            //     // Handle redirection for other roles or perform other actions
            // }

            if (user.authorities.some(authority => authority.authority === 'ADMIN')) {
                navigate('/admin');
            } else if (user.authorities.some(authority => authority.authority === 'BISDEV')) {
                navigate('/bisdev');
            } else if (user.authorities.some(authority => authority.authority === 'FINANCE')) {
                navigate('/finance');
            } else if (user.authorities.some(authority => authority.authority === 'PARTNERSHIP')) {
                navigate('/partnership');
            } else if (user.authorities.some(authority => authority.authority === 'OPERATION')) {
                navigate('/operation');
            }
            
            } catch (error) {
            console.error('Error logging in:', error.response || error.message);
            setErrors('Error logging in.');
            }
    };

    return (
        <div className="object-cover-login absolute inset-0 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh'}}>
            <div className="card bg-white shadow-lg rounded-md p-8">
                <form
                    onSubmit={(e) => onRegister(e)}
                >
                    <h2 className="text-2xl font-bold mb-3">Login</h2>
                    {/* Username */}
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="username" className="text-sm" style={{ marginBottom: '5px' }}>Username: </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                                className="input-field"
                            style={{ marginTop: '5px' }}
                        />
                    </div>
        
                    <br></br>

                    {/* Password */}
                    <div className="flex flex-col space-y-1 relative items-center">
                        <label htmlFor="password" className="text-sm">Password: </label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input-field"
                            />
                            <button
                                type="button"
                                className="ml-2 focus:outline-none"
                                onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="button-pink w-full"
                    >
                        Login
                    </button>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        className="modal-confirmation"
                    >
                        <h2>Confirm Registration</h2>
                        <p>Are you sure you want to register?</p>
                        <button className="button-green" onClick={confirmRegistration}>Confirm</button>
                        <button className="button-pink" onClick={closeModal}>Cancel</button>
                    </Modal>
                </form>
            </div>
        </div>
    );
};

export default Login;