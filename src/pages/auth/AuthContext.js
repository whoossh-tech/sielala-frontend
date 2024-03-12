import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // New state for user role

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
  


  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password
      });

      const { jwt, user } = response.data;
      localStorage.setItem('token', jwt);
      localStorage.setItem('role', user.authorities[0].authority);
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      console.log('Response from authcontext:');
      console.log(response);
      console.log('Role:', role); // Checkpoint: Log the user's role
      setUser(user);
      setRole(response.data.user.authorities[0].authority);
      console.log('Role set:', response.data.user.authorities[0].authority);

      return response;
    } catch (error) {
      console.error('Error logging in:', error.response || error.message);
      throw new Error('Error logging in.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    axios.defaults.headers.common['Authorization'] = null;
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;