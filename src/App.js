import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RegisterStaffForm from './pages/RegisterStaffForm';
import UserList from './pages/UserList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/staff-registration" element={<RegisterStaffForm/>}></Route>
            <Route path="/user-list" element={<UserList/>}></Route>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
