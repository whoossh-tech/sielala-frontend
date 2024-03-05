import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RewardInventory from './pages/RewardInventory';
import { TenantRegistrationForm } from './pages/tenant/TenantRegistrationForm';
import { TenantRegistrationSuccessPage } from './pages/tenant/TenantRegistrationSuccessPage';
import { TenantRegistrationFailPage } from './pages/tenant/TenantRegistrationFailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/reward-inventory" element={<RewardInventory />}></Route>

            {/* tenant routes */}
            <Route path="/tenant-registration" element={<TenantRegistrationForm/>}></Route>
            <Route path="/tenant-registration/success" element={<TenantRegistrationSuccessPage/>}></Route>
            <Route path="/tenant-registration/fail" element={<TenantRegistrationFailPage/>}></Route>
            
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
