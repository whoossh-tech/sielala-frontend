import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../static/css/RegisterStaffForm.css';
import '../static/css/Button.css';

const RegisterStaffForm = () => {
    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axios.post('http://localhost:8080/admin/register', {
                email, name, username, password
            })

            console.log('Staff registered successfully:', response.data);
        } catch (error) {
            console.error('Error registering staff:', error.response || error.message);
            setErrors('Error registering staff.');
        }
    };

    return (
        <form
            className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg"
            onSubmit={(e) => onRegister(e)}
        >

        <h1 id="page-title" className="font-reynaldo text-3xl font-bold mb-6 text-primary-80">Staff Registration</h1>
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
                placeholder="ex. lalamarket@gmail.com"
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
                placeholder="Lala"
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

            {/* username */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="username">
                Username<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.username && "border-danger"}`}>
                <input
                id="brand_instagram"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="ex. @LalaMarketOfficial"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            {errors.username && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.username}
                </span>
            )}
            </div>

            {/* password */}
            <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="password">
                Password<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.password && "border-danger"}`}>
                <input
                id="password"
                className="px-4 py-3 w-full focus:outline-none"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {errors.password && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.password}
                </span>
            )}
            </div>

    
        </div>

        <br></br>

        <button
            className="button-pink"
            type="submit"
            // disabled={isRegisterLoading}
        >
            Register Staff
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

        <br></br>

        </form>
    );
};

// RegisterForm.displayName = "RegisterForm";
export default RegisterStaffForm;