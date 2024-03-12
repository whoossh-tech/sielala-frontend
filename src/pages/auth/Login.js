import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast, Toaster } from 'react-hot-toast';
import '../../static/css/RegisterStaffForm.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/background.svg';
import '../../static/css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    return username.trim() !== '' && password.trim() !== '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await login(username, password);
        const role = localStorage.getItem('role');

        switch (role) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'PARTNERSHIP':
            navigate('/partnership');
            break;
          case 'OPERATION':
            navigate('/operation');
            break;
          case 'FINANCE':
            navigate('/finance');
            break;
          case 'BISDEV':
            navigate('/bisdev');
            break;
        //   default:
        //     navigate('/unauthorized');
        }
      } catch (error) {
        console.error('Error logging in:', error.message);
        toast.error('Login Failed: Your username or password is incorrect');
      }
    } else {
      console.log('Form validation failed');
      toast.error('Login Failed: Please enter your username and password');
    }
  };

  return (
    <div className="object-cover-login absolute inset-0 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card bg-white shadow-lg rounded-md p-8">
        <h2 className="text-2xl font-bold mb-3">Login</h2>
        <form
          className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100 bg-white rounded-2xl shadow-lg"
          onSubmit={handleLogin}
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

          <br></br>

          {/* Password */}
          <div className="flex flex-col space-y-1 relative">
            <label htmlFor="password" className="text-sm">Password: </label>
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
              className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="button-pink w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;