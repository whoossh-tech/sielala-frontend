import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../static/css/RegisterStaffForm.css';
import '../static/css/Button.css';
import background from '../assets/background.svg';
import mascot from '../assets/mascot.png';
import scarf from '../assets/scarf.png';

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

    const login = async (e) => {
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
            if (user.authorities.some(authority => authority.authority === 'ADMIN')) {
                navigate('/user-list');
            } else {
                // Handle redirection for other roles or perform other actions
            }
            
            } catch (error) {
            console.error('Error logging in:', error.response || error.message);
            setErrors('Error logging in.');
            }
    };

    return (
        <div className="bg-primary-10 w-screen h-screen overflow-y-auto flex items-center justify-center p-1 sm:p-16 pt-128 md:pt-96">
            <img
                src={background}
                alt="background"
                fill
                className="object-cover absolute inset-0 w-full h-full"
                // className="object-cover"
                // sizes="100%"
            />
            {/* <div className="relative bg-white rounded-md px-8 py-12 flex flex-col items-center mx-4"> */}
            <div className="relative z-10 bg-white rounded-md px-8 py-12 flex flex-col items-center mx-4">
                <div className="w-full h-40 bottom-full absolute left-1/2 transform -translate-x-1/2">
                    <img
                        src={mascot}
                        alt="mascot"
                        fill
                        className="object-contain"
                        sizes="100%"
                    />
                    <div className="relative w-full h-full">
                        <div className="absolute top-full left-1/2 w-12 h-12 transform -translate-x-24 -translate-y-4">
                            <img
                                src={scarf}
                                alt="scarf"
                                fill
                                className="object-contain"
                                sizes="100%"
                            />
                        </div>
                    </div>
                </div>
                <p className="text-neutral-100 text-3xl text-center">Login</p>
                <form className="w-full max-w-md" onSubmit={login}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="border-1 rounded-md border-neutral-30 p-2 mt-1"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="border-1 rounded-md border-neutral-30 p-2 mt-1"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                                onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary-70 text-white rounded-md p-2 w-full mt-4"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );

    // return (
    //     <form
    //         className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg"
    //         onSubmit={(e) => onRegister(e)}
    //     >

    //     <h1 id="page-title" className="font-reynaldo text-3xl font-bold mb-6 text-primary-80">Login</h1>
    //     <div className="flex flex-col items-stretch space-y-4 mt-6 w-full">

    //         {/* username */}
    //         <div className="input-form flex flex-col space-y-1">
    //         <label className="input-label font-reynaldo text-left" htmlFor="username">
    //             Username<span className="text-danger">*</span>
    //         </label>

    //         <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.username && "border-danger"}`}>
    //             <input
    //             id="username"
    //             className="px-4 py-3 w-full focus:outline-none"
    //             placeholder="ex. lalamarket"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             />
    //         </div>

    //         {errors.username && (
    //             <span username="mt-0.5 text-danger text-xs">
    //             {errors.username}
    //             </span>
    //         )}
    //         </div>

    //         {/* password */}
    //         <div className="input-form flex flex-col space-y-1">
    //             <label className="input-label font-reynaldo text-left" htmlFor="password">
    //                 Password<span className="text-danger">*</span>
    //             </label>

    //             <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.password && "border-danger"}`}>
    //                 <input
    //                     id="password"
    //                     className="px-4 py-3 w-full focus:outline-none"
    //                     type={showPassword ? 'text' : 'password'}
    //                     placeholder="password"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                 />
    //                 <button
    //                     type="button"
    //                     className="toggle-password"
    //                     onClick={() => setShowPassword(!showPassword)}
    //                 >
    //                     {showPassword ? 'Hide' : 'Show'}
    //                 </button>
    //             </div>

    //             {errors.password && (
    //                 <span className="mt-0.5 text-danger text-xs">
    //                     {errors.password}
    //                 </span>
    //             )}
    //         </div>
    //     </div>

    //     return (
    //     <div className="bg-primary-10 w-screen h-screen overflow-y-auto flex items-center justify-center p-1 sm:p-16 pt-128 md:pt-96">
    //         <img
    //             src="/register/background.svg"
    //             alt="background"
    //             className="object-cover"
    //             style={{ width: '100%' }}
    //         />
    //     <div className="relative bg-white rounded-md px-8 py-12 flex flex-col items-center mx-4">
    //             <div className="w-full h-40 bottom-full absolute left-1/2 transform -translate-x-1/2">
    //                 <img
    //                     src="/register/mascot.png"
    //                     alt="mascot"
    //                     className="object-contain"
    //                     style={{ width: '100%' }}
    //     />
    //     <div className="relative w-full h-full">
    //                     <div className="absolute top-full left-1/2 w-12 h-12 transform -translate-x-24 -translate-y-4">
    //                         <img
    //                             src="/register/scarf.png"
    //                             alt="scarf"
    //                             className="object-contain"
    //                             style={{ width: '100%' }}
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //     <p className="text-neutral-100 text-3xl text-center">Login</p>
    //     <div className="flex flex-col mt-8 w-full">
    //                 <label htmlFor="username">Username</label>
    //                 <input
    //                     type="text"
    //                     id="username"
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     value={username}
    //                     placeholder="ex. Jane Doe"
    //                     className="border-1 rounded-md border-neutral-30 p-2 mt-1"
    //                 />
    //             </div>
    //     <div className="flex flex-col mt-8 w-full">
    //         <label htmlFor="password">Password</label>
    //         <input
    //             type="text"
    //             id="name"
    //             onChange={(e) => setPassword(e.target.value)}
    //             value={password}
    //             placeholder="ex. Jane Doe"
    //             className="border-1 rounded-md border-neutral-30 p-2 mt-1"
    //         />
    //     </div>

        

    //     <br></br>

    //     <button
    //         className="button-pink"
    //         type="submit"
    //         // disabled={isRegisterLoading}
    //     >
    //         Login
    //     </button>

    //     <Modal
    //         isOpen={isModalOpen}
    //         onRequestClose={closeModal}
    //         className="modal-confirmation"
    //     >
    //         <h2>Confirm Registration</h2>
    //         <p>Are you sure you want to register?</p>
    //         <button className="button-green" onClick={confirmRegistration}>Confirm</button>
    //         <button className="button-pink" onClick={closeModal}>Cancel</button>
    //     </Modal>

    //     <br></br>

    //     </form>
    // );
};

// RegisterForm.displayName = "RegisterForm";
    export default Login;