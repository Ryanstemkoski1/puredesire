import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import { mainTheme } from '../../mainTheme.js';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import {Route, Routes, BrowserRouter as Router, useNavigate } from "react-router-dom";
import Chart from './Chart';
import DashboardData from './DashboardData';
import ResponsiveDrawer from '../../components/responsiveDrawer';
import LibraryData from './LibraryData';
import Deposits from './Deposits';
import Orders from './Orders';
import RecentPurchasesData from "./RecentPurchasesData";
import CreditsData from "./CreditsData";
import DisclaimersData from "./DisclaimersData";
import GroupsData from "./GroupsData";
import NotebooksData from "./NotebooksData";
import AssessmentsData from "./AssessmentsData";
import UserData from "./UserData";
import {SignOut} from "../../components/auth";
import CreateUser from "../User/create-user.component"
import EditUser from "../User/edit-user.component";
import UserList from "../User/user-list.component";
import logo from "../../images/pure-desire-logo-2022.png";
import smallLogo from "../../images/P-logo.png";
import './Dashboard.css';
import HomeIcon from '@mui/icons-material/Home';
import WorkbookList from "../Workbook/workbook-list.component";
import CreateWorkbook from "../Workbook/create-workbook.component";
import LanguageSelect from "../../languageSelect";
import EditWorkbook from "../Workbook/edit-workbook.component";
import GroupList from "../Group/group-list.component";
import CreateGroup from "../Group/create-group.component";
import EditGroup from "../Group/edit-group.component";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from '@mui/material/Switch';
import {FormGroup} from "@mui/material";
import { getCurrentUser } from "../../utils/cognitoAuth";
import Amplify, {Auth, Hub} from "aws-amplify";
import {axiosWithAuth} from "../../utils/axiosWithAuth";
import axios from "axios";
import {Authentication} from "../Authentication";

// require('dotenv').config()
//
// console.log(process.env.REACT_APP_API_URL);
// console.log(process.env.API_URL);

function Copyright(props) {
    return (
        <footer>
            <Typography variant="body2" color="text.secondary" align="left" {...props} sx={{ m: 2, pt: 4 }}>
                {'Copyright © '}
                {new Date().getFullYear()} {' '}
                Pure Desire Ministries
            </Typography>
        </footer>
    );
}

// const currentUser = await Auth.signIn();
// const temp_data = Auth.currentUserInfo();
// console.log(temp_data);

const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            padding: '45px',
            marginBottom: '70px',
            boxShadow: '0px 24px 3px -2px black',
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(18.5),
                },
            }),
        },
    }),
);

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    // const [userView, setUserView] = React.useState(false);
    const [userView, setUserView] = useLocalStorage("UserView", true);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentUserRole, setCurrentUserRole] = React.useState('user');

    React.useEffect(() => {
        getCurrentUser()
            .then((userData) => {
                // setCurrentUser(userData);
                axios
                    .get(
                        process.env.REACT_APP_API_URL + "/user/get-user-information/" + userData.email
                    )
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.role == 'user'){
                            setUserView(true);
                        }
                        setCurrentUserRole(res.data.role);
                        setCurrentUser(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

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

    const handleUserViewChange = (event) => {
        setUserView(event.target.checked);
        localStorage.setItem('UserView',event.target.checked);
        window.location.href = '/';
    };

    return (
        <ThemeProvider theme={mainTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }} className="hiddenMobile"
                    >

                        {/*<IconButton*/}
                        {/*    edge="start"*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="open drawer"*/}
                        {/*    onClick={toggleDrawer}*/}
                        {/*    sx={{*/}
                        {/*        marginRight: '36px',*/}
                        {/*        ...(open && { display: 'none' }),*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <img src={smallLogo} alt="Pure Desire Ministries" className="smallLogo" />*/}
                        {/*</IconButton>*/}

                        <Router>
                            <Routes>
                                <Route path="/" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >

                                        <HomeIcon sx={{ mr: 1 }} /> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard
                                    </Typography>}>
                                </Route>
                                <Route path="library" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span>  Library
                                    </Typography>}>
                                </Route>
                                <Route path="recent-purchases" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Recent Purchases
                                    </Typography>}>
                                </Route>
                                <Route path="credits" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Credits
                                    </Typography>}>
                                </Route>
                                <Route path="disclaimers" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Disclaimers
                                    </Typography>}>
                                </Route>
                                <Route path="group" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Groups
                                    </Typography>}>
                                </Route>
                                <Route path="notebooks" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Notebooks
                                    </Typography>}>
                                </Route>
                                <Route path="assessments" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Assessments
                                    </Typography>}>
                                </Route>
                                <Route path="user" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Users
                                    </Typography>}>
                                </Route>
                                <Route path="user/create-user" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Create Users
                                    </Typography>}>
                                </Route>
                                <Route path="user/edit-user/:id" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Update Users
                                    </Typography>}>
                                </Route>
                                <Route path="workbook" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Digital Library
                                    </Typography>}>
                                </Route>
                                <Route path="workbook/create-workbook" element={
                                    <Typography
                                        component="p"
                                        variant="p"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                        className="breadCrumb"
                                    >
                                        <HomeIcon sx={{ mr: 1 }}/> <span style={{ marginRight: '10px', fontSize: '12px' }}>/</span> Dashboard <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '12px' }}>/</span> Create New Workbook
                                    </Typography>}>
                                </Route>
                            </Routes>
                        </Router>

                        <Grid item xs={12} sm={2}>
                            <FormGroup>
                                {currentUserRole=='admin' && (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={userView}
                                                onChange={handleUserViewChange}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        className="viewToggle"
                                        label="User View"
                                    />
                                )}
                            </FormGroup>
                        </Grid>

                        <LanguageSelect />

                        <SignOut />
                        {/*<IconButton color="inherit">*/}
                        {/*    <Badge badgeContent={4} color="secondary">*/}
                        {/*        <NotificationsIcon />*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                    </Toolbar>
                </AppBar>

                <ResponsiveDrawer />

                {/*<IconButton className="collapseIcon hiddenMobile" onClick={toggleDrawer} style={{ textAlign: 'left', borderRadius: '10px', lineHeight: '1' }}>*/}
                {/*    <span>Collapse</span>*/}
                {/*</IconButton>*/}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        {/*<Grid container spacing={3}>*/}
                        {/*    <Grid item xs={12}>*/}
                        {/*        <Paper*/}
                        {/*            sx={{*/}
                        {/*                p: 2,*/}
                        {/*                display: 'flex',*/}
                        {/*                flexDirection: 'column',*/}
                        {/*                height: 240,*/}
                        {/*            }}*/}
                        {/*        >*/}
                                    <Router>
                                        <Routes>
                                            {/*<Route path="/" element={<UserList />}></Route>*/}
                                            <Route path="/" element={<DashboardData />}></Route>
                                            <Route path="library" element={<LibraryData />}></Route>
                                            <Route path="recent-purchases" element={<RecentPurchasesData />}></Route>
                                            <Route path="credits" element={<CreditsData />}></Route>
                                            <Route path="disclaimers" element={<DisclaimersData />}></Route>
                                            {/*<Route path="groups" element={<GroupsData />}></Route>*/}
                                            <Route path="notebooks" element={<NotebooksData />}></Route>
                                            <Route path="assessments" element={<AssessmentsData />}></Route>
                                            <Route path="user" element={<UserList />}></Route>
                                            <Route path="user/create-user" element={<CreateUser />}></Route>
                                            <Route path="user/edit-user/:id" element={<EditUser />}></Route>
                                            <Route path="user/user-list" element={<UserList />}></Route>
                                            <Route path="workbook" element={<WorkbookList />}></Route>
                                            <Route path="workbook/create-workbook" element={<CreateWorkbook />}></Route>
                                            <Route path="workbook/edit-workbook/:id" element={<EditWorkbook />}></Route>
                                            <Route path="workbook/workbook-list" element={<WorkbookList />}></Route>
                                            <Route path="group" element={<GroupList />}></Route>
                                            <Route path="group/create-group" element={<CreateGroup />}></Route>
                                            <Route path="group/edit-group/:id" element={<EditGroup />}></Route>
                                            <Route path="group/group-list" element={<GroupList />}></Route>
                                        </Routes>
                                    </Router>

                                {/*</Paper>*/}
                            {/*</Grid>*/}
                            {/* Recent Deposits */}
                            {/*<Grid item xs={12} md={4} lg={3}>*/}
                            {/*    <Paper*/}
                            {/*        sx={{*/}
                            {/*            p: 2,*/}
                            {/*            display: 'flex',*/}
                            {/*            flexDirection: 'column',*/}
                            {/*            height: 240,*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        <Deposits />*/}
                            {/*    </Paper>*/}
                            {/*</Grid>*/}
                            {/* Recent Orders */}
                            {/*<Grid item xs={12}>*/}
                            {/*    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>*/}
                            {/*        <Orders />*/}
                            {/*    </Paper>*/}
                            {/*</Grid>*/}
                        {/*</Grid>*/}
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}