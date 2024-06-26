import React from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";

import logo from "../../assets/logo-sielala.png";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import { useAuth } from "../../pages/auth/AuthContext";

export function NavbarPartnership() {
  const role = localStorage.getItem('role');
  const { logout } = useAuth(); 
  const handleLogout = () => {
    logout(); 
    window.location.href = '/';
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/invoice" className="flex items-center text-md text-neutral-80">
          <b>Invoice Management</b>
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/contact" className="flex items-center text-md text-neutral-80">
          <b>Partnership Management</b>
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/tenant-applicant" className="flex items-center text-md text-neutral-80">
          <b>Tenant Applicant List</b>
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/email" className="flex items-center text-md text-neutral-80">
          <b>Bulk Email</b>
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full">
      <style>{reynaldoStyles}</style>
      <Navbar className="rounded-none sticky top-0 z-10 h-max bg-primary-60 px-4 py-2 lg:px-8 lg:py-4" style={{ border: 'none' }}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <a href="/dashboard">
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
            <Button variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10 mx-4">
              <span className="montserrat text-primary-70 text-md">Hi, { role }!</span>
            </Button>

            <Button variant="gradient" size="sm" className="bg-danger hidden lg:inline-block" onClick={handleLogout}>
              <span className="montserrat text-white text-md">Log Out</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
