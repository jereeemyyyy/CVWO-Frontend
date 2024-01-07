import React from "react";
import { Typography, AppBar, Toolbar, CssBaseline, Button } from "@mui/material";




const Header: React.FC = () => {
    return (
        <>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
                <span className="material-symbols-outlined">diversity_2</span>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>CVWO Forum Page</Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        </>
    )
};








export default Header;