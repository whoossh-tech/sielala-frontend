import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { NavbarGuest } from '../../components/navbar/NavbarGuest';

import { reynaldoStyles } from "../../assets/fonts/fonts";
import backgroundPhoto from "../../assets/bg-cover.png";
import '../../static/css/VisitorRegistrationForm.css';
import '../../static/css/Button.css';

const VisitorRegistrationForm = () => {
    const { eventId } = useParams();
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[telephone, setTelephone] = useState('');
    const[location, setLocation] = useState('');
    const[age, setAge] = useState('');
    const[gender, setGender] = useState('');
    const[errors, setErrors] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name cannot be empty';
        }

        if (!email.trim()) {
            newErrors.email = 'Email cannot be empty';
        } else if (!/^\S+@\S+$/i.test(email)) {
            newErrors.email = 'Email is not valid';
        }

        if (!telephone.trim()) {
            newErrors.telephone = 'Brand Telephone Telephone cannot be empty';
        }

        if (!location.trim() || location === 'Choose booth preference') {
            newErrors.location = 'Booth Preference cannot be empty';
        }

        if (!age.trim()) {
            newErrors.age = 'Age';
        } else if (isNaN(age) || age <= 0) {
            newErrors.age = 'Electricity Amount must be a positive telephone';
        }

        if (!gender.trim() || gender === 'Choose booth preference') {
            newErrors.gender = 'Booth Preference cannot be empty';
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
        setIsLoading(true);

        try {
            
            const response = await axios.post('http://localhost:8080/api/visitor/register', {
                eventId,
                name,
                email,
                telephone,
                location,
                age: parseInt(age),
                gender
            })

            console.log('Visitor registered successfully:', response.data);
            navigate('/visitor-registration/success');
        } catch (error) {
            console.error('Error registering visitor:', error.response || error.message);
            setErrors('Error registering visitor.');
            navigate('/visitor-registration/fail');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <main className="relative overflow-y-auto h-screen w-screen bg-neutral-10 select-none">
            <style>{reynaldoStyles}</style>
            <NavbarGuest />

            <div className='bg-neutral-100 relative' style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', height: '200px' }}>
                <div>
                    <h1 id="page-title" className="font-reynaldo mb-6 text-primary-10 ml-6" style={{ paddingTop: 80, paddingLeft: 185, textAlign: 'left', fontSize: 50 }}>
                    Visitor Registration</h1>
                    <div>
                        <p className="subtitle">Register as Visitor at Lala Market now!</p>
                    </div>
                </div>
            </div>

            <form 
                className="flex flex-col items-center px-4 pt-8 pb-6 mt-3 w-full max-w-screen-2xl mx-auto text-neutral-100 rounded-2xl"
                onSubmit={(e) => onRegister(e)}
            >

                <div className="columns-2">
                    <div className="first-column">

                        {/* name */}
                        <div className="input-form-visitor flex flex-col space-y-1 mt-2">
                        <label className="input-label font-reynaldo text-left" htmlFor="name">
                            Name<span className="text-danger">*</span>
                        </label>

                        <div className={`overflow-clip border border-neutral-40 rounded-lg ${errors.name && "border-danger"}`}>
                            <input
                            id="name"
                            className="px-4 py-3 w-full focus:outline-none"
                            placeholder="ex. Lala Market"
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

                        {/* email */}
                        <div className="input-form-visitor flex flex-col space-y-1">
                        <label className="input-label font-reynaldo text-left" htmlFor="email">
                            Email<span className="text-danger">*</span>
                        </label>

                        <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.email && "border-danger"}`}>
                            <input
                            id="email"
                            className="px-4 py-3 w-full focus:outline-none"
                            placeholder="ex. jane.doe@gmail.com"
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
                        
                        {/* telephone */}
                        <div className="input-form-visitor flex flex-col">
                        <label className="input-label font-reynaldo text-left" htmlFor="telephone">
                            Telephone Number<span className="text-danger">*</span>
                        </label>

                        <div className={`overflow-clip flex items-stretch w-full border border-neutral-40 rounded-lg ${errors.telephone && "border-danger"}`}>
                            <div className="flex items-center justify-center px-3 bg-cyan-50">
                            +62
                            </div>
                            <input
                            id="telephone"
                            type="tel"
                            className="px-4 py-3 w-full focus:outline-none"
                            placeholder="ex. 812xxxx..."
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            />
                        </div>

                        {errors.telephone && (
                            <span className="mt-0.5 text-danger text-xs">
                            {errors.telephone}
                            </span>
                        )}
                        </div>

                        {/* location */}
                        <div className="input-form-visitor flex flex-col">
                        <label className="input-label font-reynaldo text-left" htmlFor="location">
                            Location<span className="text-danger">*</span>
                        </label>

                        <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.location && "border-danger"}`}>
                            <select
                            id="location"
                            className="appearance-none px-4 py-3 w-full focus:outline-none"
                            placeholder="Choose location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            >
                            <option>Choose location</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Bogor">Bogor</option>
                            <option value="Depok">Depok</option>
                            <option value="Tangerang">Tangerang</option>
                            <option value="Bekasi">Bekasi</option>
                            <option value="Luar Jabodetabek">Luar Jabodetabek</option>
                            <option value="Luar Pulau Jawa">Luar Pulau Jawa</option>
                            </select>
                        </div>

                        {errors.location && (
                            <span className="mt-0.5 text-danger text-xs">
                            {errors.location}
                            </span>
                        )}
                        </div>

                        {/* age */}
                        <div className="input-form-visitor flex flex-col">
                        <label className="input-label font-reynaldo text-left" htmlFor="age">
                            Age<span className="text-danger">*</span>
                        </label>

                        <div className={`overflow-clip w-full border border-neutral-40 rounded-lg ${errors.age && "border-danger"}`}>
                            <input
                            id="age"
                            type="telephone"
                            className="px-4 py-3 w-full focus:outline-none"
                            placeholder="ex. 20"
                            value={age}
                            onChange={(e) => setAge(e.target.value)} 
                            />
                        </div>

                        {errors.age && (
                            <span className="mt-0.5 text-danger text-xs">
                            {errors.age}
                            </span>
                        )}
                        </div>

                        {/* gender */}
                        <div className="input-form-visitor flex flex-col">
                        <label className="input-label font-reynaldo text-left" htmlFor="gender">
                            Gender<span className="text-danger">*</span>
                        </label>

                        <div className={`relative overflow-clip w-full border border-neutral-40 rounded-lg ${errors.booth_preference && "border-danger"}`}>
                            <select
                            id="gender"
                            className="appearance-none px-4 py-3 w-full focus:outline-none"
                            placeholder="Choose gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)} 
                            >
                            <option>Choose Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Not specified">Not specified</option>
                            </select>
                        </div>

                        {errors.booth_preference && (
                            <span className="mt-0.5 text-danger text-xs">
                            {errors.booth_preference}
                            </span>
                        )}
                        </div>
                    </div>
                </div>

            <br></br>

            <button
                className="button-pink montserrat"
                type="submit"
                disabled={isLoading}
                // disabled={isRegisterLoading}
            >
                {isLoading ? 'Loading...' : 'Apply for Visitor'}
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-confirmation"
            >
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Confirm Registration</h2>
                <p className="text-center text-gray-700">Are you sure you want to register?</p>
                <br></br>
                <button className="button-green text-center" onClick={confirmRegistration}>Confirm</button>
                <button className="button-pink text-center" onClick={closeModal}>Cancel</button>
            </Modal>

            <br></br>

            </form>
        </main>
    );
};

export { VisitorRegistrationForm };