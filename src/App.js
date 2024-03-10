import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/auth/AuthContext';
import ProtectedRoute from './pages/auth/ProtectedRoute';

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
import UnauthorizedPage from './pages/auth/UnauthorizedPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashboardGuest />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Dashboards */}
            <Route element={<ProtectedRoute allowedRoles={['OPERATION']} />}>
                <Route path="/operation" element={<DashboardOperation />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['PARTNERSHIP']} />}>
              <Route path="/partnership" element={<DashboardPartnership />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['BISDEV']} />}>
              <Route path="/bisdev" element={<DashboardBisdev />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['FINANCE']} />}>
              <Route path="/finance" element={<DashboardFinance />} />
            </Route>

              {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/staff-registration" element={<RegisterStaffForm/>} />
            <Route path="/user-list" element={<UserList/>}  />
            </Route>

            {/* Operation routes */}
            <Route element={<ProtectedRoute allowedRoles={['OPERATION', 'ADMIN']} />}>
              <Route path="/reward-inventory" element={<RewardInventory />}  />
              <Route path="/add-reward/:idEvent" element={<FormRewardInventory />}  />
              <Route path="/edit-reward/:idReward" element={<EditRewardInventory />}  />
              <Route path="/reward-inventory/detail/:id" element={<RewardDetail/>} />  
            </Route>

            {/* Partnership routes */}
            <Route element={<ProtectedRoute allowedRoles={['PARTNERSHIP', 'ADMIN']} />}>
              <Route path="/tenant-registration" element={<TenantRegistrationForm/>} />
              <Route path="/tenant-registration/success" element={<TenantRegistrationSuccessPage/>} />
              <Route path="/tenant-registration/fail" element={<TenantRegistrationFailPage/>} />
            </Route>
        </Routes>
      </Router>   
      </AuthProvider> 
    </div>
  );
}

export default App;

