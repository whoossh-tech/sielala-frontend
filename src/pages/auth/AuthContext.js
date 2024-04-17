import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
      setIsAuthenticated(true);
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
      setUser(user);
      setRole(user.authorities[0].authority);
      setIsAuthenticated(true);
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
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;