import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";

import logo from "../../assets/logo-sielala.png";
import { reynaldoStyles } from "../../assets/fonts/fonts";
import { useNavigate } from 'react-router-dom';
import {toast, Toaster} from 'react-hot-toast';

export function NavbarGuest() {
  const navigate = useNavigate();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    const checkEventStatus = async () => {
        try {

          const token = localStorage.getItem('token');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get("http://localhost:8080/api/tenant/is-accepting-tenants");
          const data = response.data;
          setIsRegistrationOpen(data);
          console.log(isRegistrationOpen);

        } catch (error) { 
            console.error("Error checking event status:", error);
        }
    };

    checkEventStatus();
  }, []);

  const onLogin = () => {
    navigate("/login");
  };

  const tenantRegistrationClick = () => {
    console.log("isRegistrationOpen:", isRegistrationOpen);

    if (isRegistrationOpen) {
      navigate("/tenant-registration");
    } else {
      // Optionally show a message or perform some action when registration is closed
      toast.error('Tenant Registration is closed');
      console.log("Tenant registration is closed.");
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center text-md text-neutral-80">
          <b>Dashboard</b>
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center text-md text-neutral-80">
          <b>Visitor Registration</b>
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          className="flex items-center text-md text-neutral-80"
          onClick={isRegistrationOpen ? tenantRegistrationClick : null}
        >
          <b>Tenant Registration</b>
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
            <img
                src={logo} 
                alt="SieLALA Logo"
                className="cursor-pointer h-9 w-27 object-cover"
                href="/"
              />
              <br></br>
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>

          <div className="flex items-center gap-x-1">
            <Button onClick={onLogin} variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10">
              <span className="montserrat text-primary-70 text-md">Log in</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
