import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../static/css/RegisterStaffForm.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/background.svg';
import '../../static/css/Login.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (username.trim() === '' || email.trim() === '') {
      console.log('Form validation failed');
      return;
    }

    try {

      const response = await axios.post('http://localhost:8080/auth/forgot-password', {
                email, 
                username
            })
      
      console.log('Form submitted successfully:', response.data);
      // navigate('/forgot-password-success');
    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <div className="object-cover-login absolute inset-0 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
      <div className="card bg-white shadow-lg rounded-md p-8">
        <h2 className="text-2xl font-bold mb-3">Forgot Password</h2>
        <form
          className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100"
          onSubmit={handleForgotPassword}
        >
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

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm" style={{ marginBottom: '5px' }}>Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field"
              style={{ marginTop: '5px' }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="button-pink w-full"
          >
            Reset Password
          </button>

          <Link to="/login" className="text-sm mt-2 text-neutral-100 hover:underline">Back to Login</Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;