import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Divider, Toolbar, Typography } from '@mui/material';
import './Header.css';
import '../../App.css'
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavigationLinks } from "../../utils/Menu";
import { Link, Outlet } from "react-router-dom";
import { Container, Drawer, Hidden, IconButton, List, ListItem, SwipeableDrawer } from "@mui/material";
import { ChevronLeftRounded } from "@mui/icons-material";
import { useState } from 'react';


const Header = (props) => {
    const [openNav, setOpenNav] = useState(false);
    const openSideNav=()=>{
      setOpenNav(true);
    }
    const closeSideNav=()=>{
      setOpenNav(false);
    }
    const drawer = (
        <List className="text-capitalize">
            {NavigationLinks.map((items, key) => (
                <ListItem key={key}>
                    <Link to={items.href} onClick={closeSideNav}>
                        {items.name}
                    </Link>
                </ListItem>
            ))}
            <ListItem>
                <Link to="/profile" onClick={closeSideNav}>{props.name} </Link>
            </ListItem>
        </List>
    );

    return (
        <AppBar position="sticky">
            <Toolbar>
                <MenuIcon fontSize="large" onClick={openSideNav}/>
                <Typography variant="title" colour="primary">
                    ReactApp
                </Typography>
                <Container>
                    <Hidden xsDown>
                        <SwipeableDrawer anchor="left" 
                            open={openNav} 
                            onOpen={openSideNav} 
                            onClose={closeSideNav}>
                                <div>
                                    <IconButton onClick={closeSideNav}>
                                        <ChevronLeftRounded />
                                    </IconButton>
                                    <Divider />
                                    {drawer}
                                </div>
                            </SwipeableDrawer>
                        </Hidden>
                        <Hidden xsUp>
                            <Drawer variant="permanent">
                                <Toolbar />
                                <Box>
                                    {drawer}
                                </Box>
                            </Drawer>
                        </Hidden>
                    <Outlet />
                </Container>
                <Box id="top-user-log" sx={{'& svg': { m: 1.5,},
                '& hr': {mx: 0.5,},}}>
                    <Typography variant="body1">
                        Hi {props.name}
                    </Typography>
                    <Divider orientation='vertical' variant='middle' flexItem />
                    <NavLink to="/logout">
                        <LogoutIcon />
                    </NavLink>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;