import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import  { AuthProvider } from './pages/auth/AuthContext';

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
import TenantApplicant from './pages/tenant/TenantApplicant'
import TenantApplicantDetail from './pages/tenant/TenantApplicantDetail';
import Emails from './pages/email/Emails';
import CreateEmail from './pages/email/CreateEmail';
import ChooseContact from './pages/email/ChooseContact';
import EmailDetail from './pages/email/EmailDetail';

function App() {
  const role = localStorage.getItem('role');

  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<DashboardGuest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tenant-registration/:eventId" element={<TenantRegistrationForm/>}></Route>
          <Route path="/tenant-registration/success" element={<TenantRegistrationSuccessPage />} />
          <Route path="/tenant-registration/fail" element={<TenantRegistrationFailPage />} />

          {/* ROLE: PARTNERHSIP */}
          {role === 'PARTNERSHIP' && (
            <>
              <Route path="/partnership" element={<DashboardPartnership />} />
            </>
          )}

          {/* ROLE: OPERATION */}
          {role === 'OPERATION' && (
            <>
              <Route path="/operation" element={<DashboardOperation />} />
            </>
          )}

          {/* ROLE: BISDEV */}
          {role === 'BISDEV' && (
            <>
              <Route path="/bisdev" element={<DashboardBisdev />} />
            </>
          )}

          {/* ROLE: FINANCE */}
          {role === 'FINANCE' && (
            <>
              <Route path="/finance" element={<DashboardFinance />} />
            </>
          )}

          {/* ROLE: ADMIN */}
          {role === 'ADMIN' && (
            <>
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/staff-registration" element={<RegisterStaffForm />} />
              <Route path="/user-list" element={<UserList />} />
            </>
          )}

          {/* ROLE: OPERATION & ADMIN */}
          {(role === 'OPERATION' || role === 'ADMIN') && (
            <>
              <Route path="/reward-inventory" element={<RewardInventory />} />
              <Route path="/add-reward/:idEvent" element={<FormRewardInventory />} />
              <Route path="/edit-reward/:idReward" element={<EditRewardInventory />} />
              <Route path="/reward-inventory/detail/:id" element={<RewardDetail />} />
            </>
          )}

          {/* ROLE: BISDEV and ADMIN */}
          {(role === 'BISDEV' || role === 'ADMIN') && (
            <>
              <Route path="/event" element={<Event />} />
              <Route path="/event/create" element={<CreateEvent />} />
              <Route path="/event/detail/:idEvent" element={<DetailEvent />} />
            </>
          )}

          {/* ROLE: PARTNERSHIP and ADMIN */}
          {(role === 'PARTNERSHIP' || role === 'ADMIN') && (
            <>
              <Route path="/sponsor" element={<Sponsor />} />
              <Route path="/sponsor/create/:idEvent" element={<CreateSponsor />}></Route>
              <Route path="/sponsor/detail/:idSponsor" element={<DetailSponsor />} />
              <Route path="/tenant-applicant" element={<TenantApplicant />} />
              <Route path="/tenant-applicant/:idTenantApplicant" element={<TenantApplicantDetail />} />

            </>
          )}

          {/* ROLE: PARTNERSHIP, BISDEV, and ADMIN */}
          {(role === 'PARTNERSHIP' || role === 'ADMIN' || role === 'BISDEV') && (
            <>
              <Route path="/email" element={<Emails />} />
              <Route path="/email/:idEmail" element={<EmailDetail />} />
              <Route path="/email/write" element={<CreateEmail />} />
              <Route path="/email/choose-contact" element={<ChooseContact />} />
            </>
          )}

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router> 
      </AuthProvider>   
    </div>
  );
}

export default App;