import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/auth/AuthProvider';
import PrivateRoute from './pages/auth/PrivateRoute';
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

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <AuthProvider>
//           <Routes>
//       {/* Default route for dashboard */}
//         <Route path="/" element={<DashboardGuest />}></Route>

//       {/* Dashboard routes */}
//       <Route element={<PrivateRoute allowedRoles={['PARTNERSHIP']} />}>
//         <Route path="/partnership" element={<DashboardPartnership/>}></Route>
//       </Route>

//       <Route element={<PrivateRoute allowedRoles={['OPERATION']} />}>
//         <Route path="/operation" element={<DashboardOperation/>}></Route>
//       </Route>

//       <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
//         <Route path="/admin" element={<DashboardAdmin/>}></Route>
//       </Route>

//       <Route element={<PrivateRoute allowedRoles={['BISDEV']} />}>
//         <Route path="/bisdev" element={<DashboardBisdev/>}></Route>
//       </Route>

//       <Route element={<PrivateRoute allowedRoles={['FINANCE']} />}>
//         <Route path="/finance" element={<DashboardFinance/>}></Route>
//       </Route>

//       {/* Reward routes */}
//       <Route element={<PrivateRoute allowedRoles={['OPERATION']} />}>
//         <Route path="/reward-inventory" element={<RewardInventory/>}/>
//         <Route path="/add-reward/:idEvent" element={<FormRewardInventory/>}/>
//         <Route path="/edit-reward/:idReward" element={<EditRewardInventory/>}/>
//         <Route path="/reward-inventory/detail/:id" element={<RewardDetail/>}/>
//       </Route>

//       {/* Tenant routes */}
//       <Route element={<PrivateRoute allowedRoles={['PARTNERSHIP']} />}>
//         <Route path="/tenant-registration" element={<TenantRegistrationForm/>}/>
//         <Route path="/tenant-registration/success" element={<TenantRegistrationSuccessPage/>}/>
//         <Route path="/tenant-registration/fail" element={<TenantRegistrationFailPage/>}/>
//       </Route>

//       {/* Auth routes */}
//       <Route path="/login" element={<Login />} />

//       <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
//         <Route path="/staff-registration" element={<RegisterStaffForm/>}/>
//         <Route path="/user-list" element={<UserList/>}/>
//         <Route path="/edit-reward/:idReward" element={<EditRewardInventory/>}/>
//         <Route path="/reward-inventory/detail/:id" element={<RewardDetail/>}/>
//       </Route>

//       <Route path="/unauthorized" element={<UnauthorizedPage />} />

//     </Routes>
// </AuthProvider>  
// </Router>  
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Default route for dashboard */}
            <Route path="/" element={<DashboardGuest />} />

            {/* Dashboard routes */}
            <Route
              path="/partnership"
              element={<PrivateRoute allowedRoles={['PARTNERSHIP']} />}
            >
              <Route index element={<DashboardPartnership />} />
            </Route>

            <Route
              path="/operation"
              element={<PrivateRoute allowedRoles={['OPERATION']} />}
            >
              <Route index element={<DashboardOperation />} />
            </Route>

            {/* Add other dashboard routes similarly */}

            {/* Reward routes */}
            <Route
              path="/reward-inventory"
              element={<PrivateRoute allowedRoles={['OPERATION']} />}
            >
              <Route index element={<RewardInventory />} />
              <Route path="add-reward/:idEvent" element={<FormRewardInventory />} />
              <Route path="edit-reward/:idReward" element={<EditRewardInventory />} />
              <Route path="detail/:id" element={<RewardDetail />} />
            </Route>

            {/* Tenant routes */}
            <Route
              path="/tenant-registration"
              element={<PrivateRoute allowedRoles={['PARTNERSHIP']} />}
            >
              <Route index element={<TenantRegistrationForm />} />
              <Route path="success" element={<TenantRegistrationSuccessPage />} />
              <Route path="fail" element={<TenantRegistrationFailPage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />

            <Route
              path="/staff-registration"
              element={<PrivateRoute allowedRoles={['ADMIN']} />}
            >
              <Route index element={<RegisterStaffForm />} />
              {/* Add other admin routes similarly */}
            </Route>

            {/* User list route */}
            <Route
              path="/user-list"
              element={<PrivateRoute allowedRoles={['ADMIN']} />}
            >
              <Route index element={<UserList />} />
            </Route>

            {/* Unauthorized page route */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}


export default App;
