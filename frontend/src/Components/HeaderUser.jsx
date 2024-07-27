import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const HeaderUser = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State for logout confirmation dialog
  const navigate = useNavigate(); // React Router navigate function

  const handleLogout = () => {
    // Show logout confirmation dialog
    setOpenLogoutDialog(true);
  };

  const confirmLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Close the logout confirmation dialog
    setOpenLogoutDialog(false);

    // Navigate to the home page
    navigate("/");

    // Refresh the page
    window.location.reload();
  };

  const cancelLogout = () => {
    // Close the logout confirmation dialog
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 pt-8 container m-auto">
        <div className={`hidden md:flex space-x-4 ${isMenu ? "block" : "hidden"}`}>
          <Link to={"/"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Home
            </Button>
          </Link>
          <Link to={"/CategoryPage"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Category
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
          <Link to={"/Profile"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Profile
            </Button>
          </Link>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className="block md:hidden px-8 p-4" onClick={() => setIsMenu(!isMenu)}>
          <DensityMediumIcon />
        </div>
      </div>
      
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={cancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} color="primary">
            No
          </Button>
          <Button onClick={confirmLogout} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mobile Menu */}
      <div className="relative">
        <div className={`${isMenu ? "block" : "hidden"} bg-[#d27548] text-white md:hidden absolute rounded left-0 right-0`}>
          <ul className="list-none capitalize flex flex-col">
            <Link to={"/"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Home</li></Link>
            <Link to={"/Category"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Category</li></Link>
            <Link to={"/About"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>About</li></Link>
            <Link to={"/Profile"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Profile</li></Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeaderUser;
