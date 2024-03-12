import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/auth/AuthContext';

// import for routes
import RewardInventory from './pages/reward/RewardInventory';
import FormRewardInventory from './pages/reward/FormRewardInventory';
import EditRewardInventory from './pages/reward/EditRewardInventory';
import RewardDetail from './pages/reward/RewardDetail';
import { TenantRegistrationForm } from './pages/tenant/TenantRegistrationForm';
import { TenantRegistrationSuccessPage } from './pages/tenant/TenantRegistrationSuccessPage';
import { TenantRegistrationFailPage } from './pages/tenant/TenantRegistrationFailPage';
import { DashboardGuest } from './pages/dashboard/DashboardGuest';
import { DashboardPartnership } from './pages/dashboard/DashboardPartnership';
import { DashboardOperation } from './pages/dashboard/DashboardOperation';
import { DashboardAdmin } from './pages/dashboard/DashboardAdmin';
import { DashboardBisdev } from './pages/dashboard/DashboardBisdev';
import { DashboardFinance } from './pages/dashboard/DashboardFinance';
import Login from './pages/auth/Login';
import RegisterStaffForm from './pages/auth/RegisterStaffForm';
import UserList from './pages/auth/UserList';
import Sponsor from "./pages/Sponsor/Sponsor";
import CreateSponsor from "./pages/Sponsor/CreateSponsor";
import DetailSponsor from "./pages/Sponsor/DetailSponsor";
import Event from "./pages/Event/Event";
import CreateEvent from "./pages/Event/CreateEvent";
import DetailEvent from './pages/Event/DetailEvent';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
            {/* please review & correct it */}
            <Route path="/" element={<DashboardGuest />}></Route>
            <Route path="*" element={<NotFoundPage />} />

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

            {/* auth routes */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/staff-registration" element={<RegisterStaffForm/>}></Route>
            <Route path="/user-list" element={<UserList/>}></Route>

            <Route path="/event" element={<Event />} />
            <Route path="/event/create" element={<CreateEvent />} />
            <Route path="/event/detail/:idEvent" element={<DetailEvent/>}></Route>
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/sponsor/create" element={<CreateSponsor />} />
            <Route path="/sponsor/detail/:idSponsor" element={<DetailSponsor/>}></Route>
        </Routes>
      </Router> 
      </AuthProvider>   
    </div>
  );
}

export default App;
