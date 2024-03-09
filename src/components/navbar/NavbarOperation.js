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
        <a href="/staff" className="font-reynaldo flex items-center text-lg text-neutral-80">
          Dashboard
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/reward-inventory" className="font-reynaldo flex items-center text-lg text-neutral-80">
          Reward Inventory
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="font-reynaldo flex items-center text-lg text-neutral-80">
          Reward Redemption
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
                className="cursor-pointer h-11 w-30 object-cover"
                href="/"
              />
              <br></br>
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>

          <div className="flex items-center gap-x-1">
            <Button variant="gradient" size="sm" className="hidden lg:inline-block bg-primary-10">
              <span className="montserrat text-primary-70 text-lg">Log in</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
