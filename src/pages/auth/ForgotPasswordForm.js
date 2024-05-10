import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
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
      toast.success('Reset Password Success: Check your email for new login credentials!');
      // navigate('/forgot-password-success');
    } catch (error) {
      console.error('Error resetting password:', error.message);
      toast.error('Reset Password Failed: Please make sure your username and email has been registered');
    }
  };

  return (
    <div className="object-cover-login absolute inset-0 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
       <Toaster position="top-center" reverseOrder={false} />
      <div className="card bg-white shadow-lg rounded-md p-8">
      
        <form
          className="flex flex-col items-left text-neutral-100"
          onSubmit={handleForgotPassword}
        >
          <h2 className="text-2xl font-bold mb-3">Forgot Password</h2>

          <br></br>

          {/* Username */}

          <div className="flex justify-between">
            <label htmlFor="username" className="text-sm" style={{ marginBottom: '5px' }}>Username: </label>
          </div>

          <div className="flex flex-col space-y-1">
            {/* <label htmlFor="username" className="text-sm" style={{ marginBottom: '5px' }}>Username: </label> */}
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

          <div className="flex justify-between">
          <label htmlFor="email" className="text-sm" style={{ marginBottom: '5px' }}>Email: </label>
          </div>

          {/* Email */}
          <div className="flex justify-between">
            {/* <label htmlFor="email" className="text-sm" style={{ marginBottom: '5px' }}>Email: </label> */}
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

          <br></br>

          {/* Submit Button */}
          <button
            type="submit"
            className="button-pink w-full"
          >
            Reset Password
          </button>

          <Link to="/login" className="text-sm mt-2 text-neutral-100" style={{ textDecoration: 'underline' }}>Back to Login</Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;