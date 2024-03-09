import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../static/css/RegisterStaffForm.css';
import '../static/css/Button.css';
import { useNavigate } from 'react-router-dom';

const RegisterStaffForm = () => {
    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const [role, setRole] = useState('');
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

        // if (!username.trim()) {
        //     newErrors.username = 'Username cannot be empty';
        // }

        // if (!password.trim()) {
        //     newErrors.password = 'Password cannot be empty';
        // }

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
                email, 
                name, 
                role: role,
            })

            console.log('Staff registered successfully:', response.data);

            navigate('/user-list');
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

            {/* role dropdown */}
        <div className="input-form flex flex-col space-y-1">
            <label className="input-label font-reynaldo text-left" htmlFor="role">
                Role<span className="text-danger">*</span>
            </label>

            <div className={`overflow-clip w-full border border-neutral-40 rounded-lg`}>
                <select
                    id="role"
                    className="px-4 py-3 w-full focus:outline-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="" disabled>Select a role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="BISDEV">Business Development</option>
                    <option value="PARTNERSHIP">Partnership</option>
                    <option value="FINANCE">Finance</option>
                    <option value="OPERATION">Operation</option>
                </select>
            </div>

            {errors.role && (
                <span className="mt-0.5 text-danger text-xs">
                {errors.role}
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
                id="modal-confirmation"
                
            >
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Create Account</h2>
                <p className="text-center text-gray-700">Are you sure you want to create this staff account?</p>
                <br></br>
                <button className="button-red text-center" onClick={closeModal}>Cancel</button>
                <button className="button-green text-center" onClick={confirmRegistration}>Confirm</button>
        </Modal>

        <br></br>

        </form>
    );
};

export default RegisterStaffForm;