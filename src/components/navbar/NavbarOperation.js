import React from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";

import logo from "../../assets/logo-sielala.png";
import { reynaldoStyles } from "../../assets/fonts/fonts";

export function NavbarOperation() {
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/operation" className="flex items-center text-md text-neutral-80">
          <b>Dashboard</b>
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/reward-inventory" className="flex items-center text-md text-neutral-80">
          <b>Reward Inventory</b>
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center text-md text-neutral-80">
          <b>Reward Redemption</b>
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full">
      <style>{reynaldoStyles}</style>
      <Navbar className="rounded-none sticky top-0 z-10 h-max bg-primary-60 px-4 py-2 lg:px-8 lg:py-4" style={{ border: 'none', zIndex: '0' }}>
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
            <Button variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10 mx-4">
              <span className="montserrat text-primary-70 text-md">Hi, OPERATION!</span>
            </Button>

            <Button variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10">
              <span className="montserrat text-primary-70 text-md">Log Out</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}