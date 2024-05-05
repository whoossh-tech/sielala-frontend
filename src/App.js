import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./pages/auth/AuthContext";

// import for routes
import RewardInventory from "./pages/reward/RewardInventory";
import FormRewardInventory from "./pages/reward/FormRewardInventory";
import EditRewardInventory from "./pages/reward/EditRewardInventory";
import RewardDetail from "./pages/reward/RewardDetail";
import RewardRedemptionHistory from "./pages/reward/RewardRedemptionHistory";
import AddRewardRedemptionData from "./pages/reward/AddRewardRedemptionData";
import { TenantRegistrationForm } from "./pages/tenant/TenantRegistrationForm";
import { TenantRegistrationSuccessPage } from "./pages/tenant/TenantRegistrationSuccessPage";
import { TenantRegistrationFailPage } from "./pages/tenant/TenantRegistrationFailPage";
import { DashboardGuest } from "./pages/dashboard/DashboardGuest";
import { DashboardPartnership } from "./pages/dashboard/DashboardPartnership";
import { DashboardOperation } from "./pages/dashboard/DashboardOperation";
import { DashboardAdmin } from "./pages/dashboard/DashboardAdmin";
import { DashboardBisdev } from "./pages/dashboard/DashboardBisdev";
import { DashboardFinance } from "./pages/dashboard/DashboardFinance";
import { DashboardStaff } from "./pages/dashboard/DashboardStaff";

import Login from "./pages/auth/Login";
import ForgotPasswordForm from './pages/auth/ForgotPasswordForm';
import RegisterStaffForm from "./pages/auth/RegisterStaffForm";
import UserList from "./pages/auth/UserList";
import EditUserForm from "./pages/auth/EditUserForm";
import Sponsor from "./pages/Sponsor/Sponsor";
import CreateSponsor from "./pages/Sponsor/CreateSponsor";
import DetailSponsor from "./pages/Sponsor/DetailSponsor";
import Event from "./pages/Event/Event";
import CreateEvent from "./pages/Event/CreateEvent";
import DetailEvent from "./pages/Event/DetailEvent";
import EditEvent from "./pages/Event/EditEvent";
import NotFoundPage from "./pages/NotFoundPage";
import CreateInvoice from "./pages/invoice/CreateInvoice";
import Invoice from "./pages/invoice/Invoice";
import InvoiceDetail from "./pages/invoice/InvoiceDetail";
import EditDetailInvoice from "./pages/invoice/EditDetailInvoice";
import TenantApplicant from "./pages/tenant/TenantApplicant";
import TenantApplicantDetail from "./pages/tenant/TenantApplicantDetail";
import EditSponsor from "./pages/Sponsor/EditSponsor";
import EditTenant from "./pages/contact/EditTenant";
import Emails from "./pages/email/Emails";
import CreateEmail from "./pages/email/CreateEmail";
import ChooseContact from "./pages/email/ChooseContact";
import EmailDetail from "./pages/email/EmailDetail";

import { VisitorRegistrationForm } from "./pages/Visitor/VisitorRegistrationForm";
import { VisitorRegistrationSuccessPage } from "./pages/Visitor/VisitorRegistrationSuccessPage";
import { VisitorRegistrationFailPage } from "./pages/Visitor/VisitorRegistrationFailPage";
import Visitor from "./pages/Visitor/Visitor";
import VisitorDetail from "./pages/Visitor/VisitorDetail";
import Contacts from './pages/contact/Contacts';
import TenantDetail from './pages/contact/TenantDetail';

function App() {
  const role = localStorage.getItem("role");

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<DashboardGuest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/tenant-registration/:eventId" element={<TenantRegistrationForm />}></Route>
            <Route path="/tenant-registration/success" element={<TenantRegistrationSuccessPage />} />
            <Route path="/tenant-registration/fail" element={<TenantRegistrationFailPage />} />
            <Route path="/visitor-registration/:eventId" element={<VisitorRegistrationForm />}></Route>
            <Route path="/visitor-registration/success" element={<VisitorRegistrationSuccessPage />} />
            <Route path="/visitor-registration/fail" element={<VisitorRegistrationFailPage />} />

            {/* ROLE: ALL STAFF */}
            {(role === "OPERATION" || role === "ADMIN" || role === "BISDEV" || role === "FINANCE" || role === "PARTNERSHIP") && (
              <>
                <Route path="/dashboard" element={<DashboardStaff />} />
              </>
            )}

            {/* ROLE: PARTNERHSIP */}
            {role === "PARTNERSHIP" && (
              <>
                <Route path="/partnership" element={<DashboardPartnership />} />
              </>
            )}

            {/* ROLE: OPERATION */}
            {role === "OPERATION" && (
              <>
                <Route path="/operation" element={<DashboardOperation />} />
              </>
            )}

            {/* ROLE: BISDEV */}
            {role === "BISDEV" && (
              <>
                <Route path="/bisdev" element={<DashboardBisdev />} />
              </>
            )}

            {/* ROLE: FINANCE */}
            {role === "FINANCE" && (
              <>
                <Route path="/finance" element={<DashboardFinance />} />
              </>
            )}

            {/* ROLE: ADMIN */}
            {role === "ADMIN" && (
              <>
                <Route path="/admin" element={<DashboardAdmin />} />
                <Route path="/staff-registration" element={<RegisterStaffForm />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/user/edit/:idUser" element={<EditUserForm />} />
              </>
            )}

            {/* ROLE: OPERATION & ADMIN */}
            {(role === "OPERATION" || role === "ADMIN") && (
              <>
                <Route path="/reward-inventory" element={<RewardInventory />} />
                <Route path="/add-reward/:idEvent" element={<FormRewardInventory />} />
                <Route path="/edit-reward/:idReward" element={<EditRewardInventory />} />
                <Route path="/reward-inventory/detail/:id" element={<RewardDetail />} />
                <Route path="/reward-redemption-history" element={<RewardRedemptionHistory />} />
                <Route path="/add-redemption-data/:idEvent" element={<AddRewardRedemptionData />} />
              </>
            )}

            {/* ROLE: BISDEV and ADMIN */}
            {(role === "BISDEV" || role === "ADMIN") && (
              <>
                <Route path="/event" element={<Event />} />
                <Route path="/event/create" element={<CreateEvent />} />
                <Route path="/event/detail/:idEvent" element={<DetailEvent />} />
                <Route path="/visitor" element={<Visitor />} />
                <Route path="/visitor/detail/:idVisitor" element={<VisitorDetail />} />
                <Route path="/event/edit/:idEvent" element={<EditEvent />} />
              </>
            )}

            {/* ROLE: PARTNERSHIP and ADMIN */}
            {(role === "PARTNERSHIP" || role === "ADMIN") && (
              <>
                <Route path="/contact" element={<Contacts />} />
                <Route path="/tenant/detail/:idTenant" element={<TenantDetail />} />
                <Route path="/sponsor/detail/:idSponsor" element={<DetailSponsor />} />
                <Route path="/sponsor/create/:idEvent" element={<CreateSponsor />}></Route>
                <Route path="/invoice/create/:idContact" element={<CreateInvoice />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/invoice/detail/:idInvoice" element={<InvoiceDetail />} />
                <Route path="/invoice/edit-detail/:idInvoice" element={<EditDetailInvoice />} />
                <Route path="/tenant-applicant" element={<TenantApplicant />} />
                <Route path="/tenant-applicant/:idTenantApplicant" element={<TenantApplicantDetail />} />
                <Route path="/tenant/edit/:idTenant" element={<EditTenant />} />
                <Route path="/sponsor/edit/:idSponsor" element={<EditSponsor />} />              </>

            )}

            {(role === 'FINANCE') && (
              <>
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/invoice/detail/:idInvoice" element={<InvoiceDetail />} />
              </>
            )}

            {/* ROLE: PARTNERSHIP, BISDEV, and ADMIN */}
            {(role === "PARTNERSHIP" || role === "ADMIN" || role === "BISDEV") && (
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
