import React, {useState} from "react";
import { Typography, AppBar, Toolbar, CssBaseline, Button } from "@mui/material";
import Loginmodal from "./Loginmodal";

const Header: React.FC = () => {
const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem("authToken");
    // Optionally, you can perform additional cleanup or redirect the user.
    window.location.reload(); // Refresh the page after logout
  };

  const handleLoginSuccess = () => {
    // You can perform additional actions upon successful login
    setLoginModalOpen(false); // Close the login modal
    window.location.reload(); // Refresh the page after login
  };

  const handleLoginButtonClick = () => {
    // Open the login modal when the login button is clicked
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    // Close the login modal when needed
    setLoginModalOpen(false);
  };


   return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <span className="material-symbols-outlined">diversity_2</span>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CVWO Forum Page
          </Typography>
          {authToken ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginButtonClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Render the LoginModal component */}
      <Loginmodal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
};
export default Header;
