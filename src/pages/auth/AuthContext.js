import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); 

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/auth/login', {
//         username,
//         password
//       });

//       const { jwt, user } = response.data;
//       localStorage.setItem('token', jwt);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
//       setUser(user);
//     } catch (error) {
//       console.error('Error logging in:', error.response || error.message);
//       throw new Error('Error logging in.');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     axios.defaults.headers.common['Authorization'] = null;
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export const AuthProvider = ({ children}) => {
  let [user, setUser] = useState(null);
  let [role, setRole] = useState(null); // New state for user role

  let login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            username,
            password
        });
        
        const { jwt, user } = response.data;
        localStorage.setItem('token', jwt);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        setUser(user);
        const role = user.authorities[0].authority; // Assuming the role is the first authority in the array
        console.log('Role:', role); // Checkpoint: Log the user's role
        setRole(role); // Set the user's role in the context
        return response;
    } catch (error) {
        console.error('Error logging in:', error.response || error.message);
        throw new Error('Error logging in.');
    }
};


  // const login = async (username, password) => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/auth/login', {
  //       username,
  //       password
  //     });

  //     const { jwt, user } = response.data;
  //     localStorage.setItem('token', jwt);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
  //     setUser(user);
  //     setRole(user.authorities[0].authority); // Assuming the role is the first authority in the array
  //   } catch (error) {
  //     console.error('Error logging in:', error.response || error.message);
  //     throw new Error('Error logging in.');
  //   }
  // };

  // const login = async (username, password) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Incorrect username or password');
  //     }
  
  //     const data = await response.json();
  //     const { jwt, user } = data;
  
  //     localStorage.setItem('token', jwt);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
  
  //     setUser(user);
  //     setRole(user.authorities[0].authority); // Assuming the role is the first authority in the array
  //   } catch (error) {
  //     console.error('Error logging in:', error.message);
  //     throw new Error('Error logging in.');
  //   }
  // };
  
  const logout = () => {
    localStorage.removeItem('token');
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