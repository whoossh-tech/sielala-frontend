import React from 'react';
import { useState, useEffect, useRef} from "react";
import 'boxicons/css/boxicons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Sidebar = () => {

    const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
        <link rel="stylesheet" href="boxicons.min.css"></link>
      {/* <a href="#" className="brand">
        <i className={sidebarVisible ? 'fas fa-times' : 'fas fa-bars'} onClick={toggleSidebar}></i>
            <span className="text-black">SieLala</span>
      </a> */}

      <a href="#" class="brand">
			<i className={sidebarVisible ? 'bx bx-menu' : 'bx bx-menu'} onClick={toggleSidebar}></i>
			<span class="text-black">SieLala</span>
		</a>

      <ul className="side-menu top">
        <li className="active">
          <a href="#">
            <i className='bx bxs-dashboard'></i>
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="user-list">
            <i className='bx bx-doughnut-chart'></i> {/* Corrected icon class name */}
            <span className="text">User Management</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-doughnut-chart'></i> {/* Corrected icon class name */}
            <span className="text">Event Management</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-message-dots'></i> {/* Corrected icon class name */}
            <span className="text">Visitor Management</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-group'></i> {/* Corrected icon class name */}
            <span className="text">Bulk Email</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-group'></i> {/* Corrected icon class name */}
            <span className="text">Reward Inventory</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-group'></i> {/* Corrected icon class name */}
            <span className="text">Reward Redemption</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-group'></i> {/* Corrected icon class name */}
            <span className="text">Invoice Management</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-group'></i> {/* Corrected icon class name */}
            <span className="text">Partnership</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-group'></i> {/* Corrected icon class name */}
            <span className="text">Tenant Applicant</span>
          </a>
        </li>
      </ul>
      {/* <ul className="side-menu">
        <li>
          <a href="#">
            <i className='fas fa-bars'></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <a href="#" className="logout">
            <i className='bx bx-log-out-circle'></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul> */}

        <ul class="side-menu">
			{/* <li>
				<a href="#">
					<i class='bx bxs-cog' ></i>
					<span class="text">Settings</span>
				</a>
			</li> */}
			<li>
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul>
      <script src="script.js"></script>
      {/* Move the script tag to the index.html or include it using a different method */}
    </section>
  );
}

export default Sidebar;
