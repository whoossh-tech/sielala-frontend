import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RewardInventory from './pages/RewardInventory';
import FormRewardInventory from './pages/FormRewardInventory';
import EditRewardInventory from './pages/EditRewardInventory';
import RewardDetail from './pages/RewardDetail';
import { TenantRegistrationForm } from './pages/tenant/TenantRegistrationForm';
import { TenantRegistrationSuccessPage } from './pages/tenant/TenantRegistrationSuccessPage';
import { TenantRegistrationFailPage } from './pages/tenant/TenantRegistrationFailPage';
import { DashboardGuest } from './pages/dashboard/DashboardGuest';
import { DashboardPartnership } from './pages/dashboard/DashboardPartnership';
import { DashboardOperation } from './pages/dashboard/DashboardOperation';
import { DashboardAdmin } from './pages/dashboard/DashboardAdmin';
import { DashboardBisdev } from './pages/dashboard/DashboardBisdev';
import { DashboardFinance } from './pages/dashboard/DashboardFinance';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            {/* please review & correct it */}
            <Route path="/" element={<DashboardGuest />}></Route>
            <Route path="/partnership" element={<DashboardPartnership />}></Route>
            <Route path="/operation" element={<DashboardOperation />}></Route>
            <Route path="/admin" element={<DashboardAdmin />}></Route>
            <Route path="/bisdev" element={<DashboardBisdev />}></Route>
            <Route path="/finance" element={<DashboardFinance />}></Route>

            {/* reward routes */}
            <Route path="/reward-inventory" element={<RewardInventory />}></Route>
            <Route path="/add-reward/:idEvent" element={<FormRewardInventory />}></Route>
            <Route path="/edit-reward/:idReward" element={<EditRewardInventory />}></Route>
            <Route path="/reward-inventory/detail/:id" element={<RewardDetail/>}></Route>

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
