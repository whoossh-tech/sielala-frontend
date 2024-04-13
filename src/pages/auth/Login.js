import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    return username.trim() !== '' && password.trim() !== '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await login(username, password);
      } catch (error) {
        console.error('Error logging in:', error.message);
        toast.error('Login Failed: Your username or password is incorrect');
      }
    } else {
      console.log('Form validation failed');
      toast.error('Login Failed: Please enter your username and password');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const role = localStorage.getItem('role');
      switch (role) {
      case 'ADMIN':
        toast.success("Login successfully");
        toast.loading('Redirecting to Admin Dashboard...');
        window.location.replace('/admin');
        break;
      case 'PARTNERSHIP':
        toast.loading('Redirecting to Partnerhsip Dashboard...');
        window.location.replace('/partnership');
        break;
      case 'OPERATION':
        toast.loading('Redirecting to Operations Dashboard...');
        window.location.replace('/operation');
        break;
      case 'FINANCE':
        toast.loading('Redirecting to Finance Dashboard...');
        window.location.replace('/finance');
        break;
      case 'BISDEV':
        toast.loading('Redirecting to Business Development Dashboard...');
        window.location.replace('/bisdev');
        break;
      default:
        toast.loading('Redirecting to Guest Dashboard...');
        window.location.replace('/'); 
    }
  }
  }, [isAuthenticated]);

  return (
    <div className="object-cover-login absolute inset-0 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card bg-white shadow-lg rounded-md p-8">
        <h2 className="text-2xl font-bold mb-3">Login</h2>
        <form
          className="flex flex-col items-center px-4 pt-8 pb-6 mt-8 w-full text-neutral-100"
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

          <Link to="/forgot-password" className="text-sm mt-2 text-neutral-100 hover:underline">Forgot Password?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;