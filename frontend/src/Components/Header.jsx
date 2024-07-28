import React, { useState } from "react";
import { Button } from "@mui/material";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-4 pt-8 container m-auto">
        <div className={`hidden md:flex space-x-4 ${isMenu ? "block" : "hidden"}`}>
          <Link to={"/"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Home
            </Button>
          </Link>

          <Link to={"/About"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              About
            </Button>
          </Link>
        </div>
        <div className="w-20 md:w-30 mx-auto">
          <Link to={'/'}>
             <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to={"/Login"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              User Login
            </Button>
          </Link>
          {/* Manager login button */}
          <Link to={"/ManagerLogin"}>
            <Button variant="contained" color="secondary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Manager Login
            </Button>
          </Link>
        </div>
        <div className="block md:hidden px-8 p-4" onClick={() => setIsMenu(!isMenu)}>
          <Button variant="contained" color="secondary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
            Manager Login
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className={`${isMenu ? "block" : "hidden"} bg-translucent `}>
          <ul className="list-none capitalize flex flex-col">
            <Link to={"/"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Home</li></Link>
           
            <Link to={"/About"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>About</li></Link>
            <Link to={"/Login"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>User Login</li></Link>
            {/* Manager login item in mobile menu */}
            <Link to={"/ManagerLogin"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Manager Login</li></Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
