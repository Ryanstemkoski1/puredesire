import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';

import {mainListItems, secondaryListItems, mainListItemsAdmin} from "../views/Dashboard/listItems";
import menuIcon from "../images/icons/Icon.svg";
import logo from "../images/pure-desire-logo-2022.png";
import userIcon from "../images/icons/user-placeholder.svg";
import LanguageSelect from "../languageSelect";
import {SignOut} from "./auth";
import SettingsIcon from '@mui/icons-material/Settings';
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';


const drawerWidth = 340;

// interface Props {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window?: () => Window;
// }

function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = React.useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}

export default function ResponsiveDrawer(props) {
    const { window } = props;

    const [open, setOpen] = React.useState(false);
    const [userView, setUserView] = useLocalStorage("UserView", true);
    // const [userView, setUserView] = React.useState(false);

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className="navStyles">
            <a href="/"><img src={logo} alt="Pure Desire Ministries" className="drawerLogo" style={{ paddingBottom: '40px' }} /></a>
            <List component="nav">
                {!userView && (
                    mainListItemsAdmin
                )}
                {userView && (
                    mainListItems
                )}
                {/*{mainListItems}*/}
                {secondaryListItems}
            </List>
        </div>
    );

    const mobileDrawer = (
        <div className="navStyles">
            <List component="nav">
                {mainListItems}
                {secondaryListItems}
            </List>

            <ul className="userToolbar">
                <li className="user"><span><img src={userIcon}></img> Grace Church</span></li>
                <li><a href="#"><SettingsIcon /> Account Settings</a></li>
                <li><LanguageSelect /></li>
                <li><SignOut /></li>
            </ul>

            <div className="navCta">
                <h2>Have questions?</h2>
                <p>Contact us if you need assistance.</p>
                <Link href="#" sx={{ mt: 1, mb: 7 }} style={{display: 'block', textAlign: 'center'}}>
                    {"Contact Us"}
                </Link>
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className="mobileToolbar">
                    <header className="mobileHeader showMobile">
                        <a href="/"><img src={logo} alt="Pure Desire Ministries" className="drawerLogo"/></a>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <img src={menuIcon} alt="Pure Desire Ministries" />
                        </IconButton>
                    </header>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    className="mobileDrawer"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {mobileDrawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open={open}
                >
                    {drawer}
                    <div className="navCta">
                        <h2>Have questions?</h2>
                        <p>Contact us if you need assistance.</p>
                        <Link href="#" sx={{ mt: 1, mb: 1 }} style={{display: 'block', textAlign: 'center'}}>
                            {"Contact Us"}
                        </Link>
                    </div>

                </Drawer>
            </Box>
        </Box>
    );
}
