import React from "react";
import { Route, Routes, BrowserRouter as Router, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signInBg from '../../images/login-bg.jpg';

function Copyright(props) {
    return (
        <Typography component="p" variant="p" color="primary.neutral" align="left" style={{position:'absolute', bottom:'0', left:'40px', fontSize: '15px', color: '#AAAAAA'}}{...props}>
            {'Copyright © '} {new Date().getFullYear()} {' '}
             Pure Desire Ministries
        </Typography>
    );
}


const theme = createTheme();

export default function Authentication() {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Router>
                        <Routes>
                            <Route path="/" element={<SignIn />}></Route>
                            <Route path="signup" element={<SignUp />}></Route>
                            <Route path="forgot-password" element={<ForgotPassword />}></Route>
                        </Routes>
                    </Router>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${signInBg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}

                    className="loginBg"
                />
            </Grid>
        </ThemeProvider>

    );
}