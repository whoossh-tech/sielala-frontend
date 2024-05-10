import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast, Toaster } from 'react-hot-toast';
import '../../static/css/RegisterStaffForm.css';
import '../../static/css/Button.css';
import backgroundPhoto from '../../assets/background.svg';
import '../../static/css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import logo from "../../assets/logo-sielala.png";
import logo from "../../assets/LalaMarketIcon.png";

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
      window.location.replace('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <main>
      <div className="object-cover-login absolute inset-0 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="card bg-white shadow-lg rounded-md p-8" >
          <form
            className="flex flex-col items-left text-neutral-100"
            onSubmit={handleLogin}
          >
            <img src={logo} alt="Logo" className="w-28 h-28 mx-auto" />
            <h2 className="text-2xl font-bold mb-3">SieLala Login</h2>

            <br></br>

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
              <label htmlFor="password" className="text-sm">Password: </label>
            </div>

            <div className="flex justify-between">
              {/* <label htmlFor="password" className="text-sm">Password: </label> */}
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

                onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>

            </div>

            <br></br>
            <button
              type="submit"
              className="button-pink w-full"
            >
              Login
            </button>

            <Link to="/forgot-password" className="text-sm mt-2 text-neutral-100" style={{ textDecoration: 'underline' }}>Forgot Password?</Link>
          </form>
        </div>
      </div>
    </main>

  );
};

export default Login;