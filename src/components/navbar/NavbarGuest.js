import React from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";

import logo from "../../assets/logo-sielala.png";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import { useNavigate } from 'react-router-dom';

export function NavbarGuest() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };

  const seeDashboard = () => {
    navigate("/dashboard");
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    </ul>
  );

  return (
    <div className="w-full">
      <style>{reynaldoStyles}</style>
      <Navbar className="rounded-none sticky top-0 z-10 h-max bg-primary-60 px-4 py-2 lg:px-8 lg:py-4" style={{ border: 'none' }}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <a href="/">
              <img
                  src={logo} 
                  alt="SieLALA Logo"
                  className="cursor-pointer h-9 w-28 object-cover"
                  href="/"
              />
            </a>
              <br></br>
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>

          <div className="flex items-center gap-x-1">

          {( role === 'BISDEV' || role === 'ADMIN' || role === 'PARTNERSHIP' || role === 'OPERATION' || role === 'FINANCE') ? (
              <Button onClick={seeDashboard} variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10 mx-4">
                  <span className="montserrat text-primary-70 text-md">Hi, { role }!</span>
              </Button>
          ) : (
              <Button onClick={onLogin} variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10">
                  <span className="montserrat text-primary-70 text-md">Log in</span>
              </Button>
          )}
            
          </div>
        </div>
      </Navbar>
    </div>
  );
}
