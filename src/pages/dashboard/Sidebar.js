import React from 'react';
import { useState, useEffect, useRef} from "react";
import 'boxicons/css/boxicons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../static/css/Style.css';
import logo from "../../assets/logo-sielala.png";
import element from "../../assets/element.png";
import { useAuth } from "../../pages/auth/AuthContext";
import {
  Button,
} from "@material-tailwind/react";


const Sidebar = ({activePage}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const role = localStorage.getItem('role');
  const { logout } = useAuth(); 

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    logout(); 
    window.location.href = '/';
  };

  return (
    <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
        <link rel="stylesheet" href="boxicons.min.css"></link>

      <a class="brand" style={{ cursor: 'pointer' }}>
        <i className={sidebarVisible ? 'bx bx-x' : 'bx bx-menu'} onClick={toggleSidebar}></i>
      </a>

      {sidebarVisible ? (
        <div className="gap-x-1 my-8 mx-6">
          <div>
            <img
              src={logo} 
              alt="SieLALA Logo"
              className="cursor-pointer object-cover"
              style={{ height: "42px" }}
              href="/"
            />
          </div>

          <div className="mt-4 mx-2" style={{ textAlign: 'left' }}>
            <Button variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10">
              <span className="montserrat text-primary-70 text-md">Hi, { role }!</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-1 my-8 mx-3">
          <img
            src={element} 
            alt="SieLALA Element"
            className="object-cover"
            style={{ height: "42px", width: "40px" }}
          />
        </div>
      )}

      {/* Sidebar Content */}
      {( role === 'ADMIN' ) && (
        <ul className="side-menu top">
          <li className={activePage === 'dashboard' ? 'active' : ''}>
            <a href="/dashboard">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>

          <li className={activePage === 'user-list' ? 'active' : ''}>
            <a href="/user-list">
              <i className='bx bx-user'></i>
              <span className="text">User Management</span>
            </a>
          </li>

          <li className={activePage === 'event' ? 'active' : ''}>
            <a href="/event">
              <i className='bx bx-calendar'></i> 
              <span className="text">Event Management</span>
            </a>
          </li>

          <li className={activePage === 'visitor' ? 'active' : ''}>
            <a href="/visitor">
              <i className='bx bx-group'></i>
              <span className="text">Visitor Data Report</span>
            </a>
          </li>

          <li className={activePage === 'reward-inventory' ? 'active' : ''}>
            <a href="/reward-inventory">
              <i className='bx bx-archive'></i>  
              <span className="text">Reward Inventory</span>
            </a>
          </li>

          <li className={activePage === 'reward-redemption' ? 'active' : ''}>
            <a href="/reward-redemption-history">
              <i className='bx bx-gift'></i>  
              <span className="text">Reward Redemption</span>
            </a>
          </li>

          <li className={activePage === 'invoice' ? 'active' : ''}>
            <a href="/invoice">
              <i className='bx bx-printer'></i>  
              <span className="text">Invoice Management</span>
            </a>
          </li>

          <li className={activePage === 'contact' ? 'active' : ''}>
            <a href="/contact">
              <i className='bx bx-phone'></i>  
              <span className="text">Partnership</span>
            </a>
          </li>

          <li className={activePage === 'tenant-applicant' ? 'active' : ''}>
            <a href="/tenant-applicant">
              <i className='bx bx-store'></i>  
              <span className="text">Tenant Applicant</span>
            </a>
          </li>

          <li className={activePage === 'bulk-email' ? 'active' : ''}>
            <a href="/email">
              <i className='bx bx-envelope'></i>  
              <span className="text">Bulk Email</span>
            </a>
          </li>
        </ul>
      )}

      {(role === "BISDEV") && (
        <ul className="side-menu top">
          <li className={activePage === 'dashboard' ? 'active' : ''}>
            <a href="/dashboard">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>

          <li className={activePage === 'event' ? 'active' : ''}>
            <a href="/event">
              <i className='bx bx-calendar'></i> 
              <span className="text">Event Management</span>
            </a>
          </li>

          <li className={activePage === 'visitor' ? 'active' : ''}>
            <a href="/visitor">
              <i className='bx bx-group'></i>
              <span className="text">Visitor Data Report</span>
            </a>
          </li>

          <li className={activePage === 'bulk-email' ? 'active' : ''}>
            <a href="/email">
              <i className='bx bx-envelope'></i>  
              <span className="text">Bulk Email</span>
            </a>
          </li>
        </ul>
      )}

      {(role === "FINANCE") && (
        <ul className="side-menu top">
          <li className={activePage === 'dashboard' ? 'active' : ''}>
            <a href="/dashboard">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>

          <li className={activePage === 'invoice' ? 'active' : ''}>
            <a href="/invoice">
              <i className='bx bx-printer'></i>  
              <span className="text">Invoice Management</span>
            </a>
          </li>
        </ul>
      )}

      {(role === "OPERATION") && (
        <ul className="side-menu top">
          <li className={activePage === 'dashboard' ? 'active' : ''}>
            <a href="/dashboard">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>

          <li className={activePage === 'reward-inventory' ? 'active' : ''}>
            <a href="/reward-inventory">
              <i className='bx bx-archive'></i>  
              <span className="text">Reward Inventory</span>
            </a>
          </li>

          <li className={activePage === 'reward-redemption' ? 'active' : ''}>
            <a href="/reward-redemption-history">
              <i className='bx bx-gift'></i>  
              <span className="text">Reward Redemption</span>
            </a>
          </li>
        </ul>
      )}

      {(role === "PARTNERSHIP") && (
        <ul className="side-menu top">
          <li className={activePage === 'dashboard' ? 'active' : ''}>
            <a href="/dashboard">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>

          <li className={activePage === 'invoice' ? 'active' : ''}>
            <a href="/invoice">
              <i className='bx bx-printer'></i>  
              <span className="text">Invoice Management</span>
            </a>
          </li>

          <li className={activePage === 'contact' ? 'active' : ''}>
            <a href="/contact">
              <i className='bx bx-phone'></i>  
              <span className="text">Partnership</span>
            </a>
          </li>

          <li className={activePage === 'tenant-applicant' ? 'active' : ''}>
            <a href="/tenant-applicant">
              <i className='bx bx-store'></i>  
              <span className="text">Tenant Applicant</span>
            </a>
          </li>

          <li className={activePage === 'bulk-email' ? 'active' : ''}>
            <a href="/email">
              <i className='bx bx-envelope'></i>  
              <span className="text">Bulk Email</span>
            </a>
          </li>
        </ul>
      )}

      {/* Log Out Content */}
      <ul class="side-menu">
        <li style={{ alignItems: "left" }}>
          <a class="logout" onClick={handleLogout} 
            style={{ cursor: 'pointer' }}
          >
            <i class='bx bxs-log-out-circle' ></i>
            <span class="text">Logout</span>
          </a>
        </li>
      </ul>

      <br></br>

    <script src="script.js"></script>

    </section>
  );
}

export default Sidebar;