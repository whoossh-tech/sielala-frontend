import React from 'react';
const Navbar = () => {
    return (
        <section>
            <script src="script.js"></script>
        <div className="navbar-left">
          <i className='bx bx-menu'></i>
          <a href="#" className="nav-link">Categories</a>
        </div>
        <div className="navbar-center">
          <form action="#" className="search-form">
            <input type="search" placeholder="Search..." className="search-input"></input>
            <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
          </form>
        </div>
        <div className="navbar-right">
          <input type="checkbox" id="switch-mode" hidden></input>
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <i className='bx bxs-bell'></i>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="people.png" alt="Profile"></img>
          </a>
        </div>
        
        </section>
    );
  }
  
  export default Navbar;