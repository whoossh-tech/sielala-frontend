import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RegisterStaffForm from './pages/RegisterStaffForm';

function App() {
  return (
    <div className="App">
      React JS App is running ^_^
      <Router>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/staff-registration" element={<RegisterStaffForm/>}></Route>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
