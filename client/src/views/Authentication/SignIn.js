import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { mainTheme } from '../../mainTheme.js';

import { federatedSignIn, signIn } from "../../utils/cognitoAuth";
import './SignIn.css';
import logo from '../../images/pure-desire-logo-2022.png';

export default function SignIn(route) {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const search = window.location.search;
    const query = new URLSearchParams(search);
    const message = query.get('message');

    // console.log(this.props.location.state.id);

    function handleLogin(e) {
        // e.preventDefault();
        // console.log(loginEmail);
        // console.log(loginPassword);
        signIn(loginEmail, loginPassword).catch((err) => {
            setErrorMessage(err.message);
        });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        handleLogin();
    };

    return (
        <ThemeProvider theme={mainTheme}>

            <div className="logo-top">
                <img src={logo} alt="Pure Desire Ministries" />
            </div>

            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'start'
                    }}
                >

                    <Typography color="primary.neutral" component="h1" variant="h1" >
                        Welcome back!
                    </Typography>
                    <Typography component="p" variant="p" sx={{ mt: 2, mb: 4 }}>
                        We're glad to see you again. Please login below.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
                        {message && (
                            <p className="error"> {message} </p>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setLoginEmail(e.target.value)}
                            value={loginEmail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setLoginPassword(e.target.value)}
                            value={loginPassword}
                        />
                        <div fullWidth style={{textAlign: 'left'}}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label= {<Box component="div" fontSize={14}>Remember me</Box>}
                            />
                        </div>
                        <div fullWidth style={{textAlign: 'left', display: 'flex', marginTop: '30px'}}>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => federatedSignIn("Google")}
                                variant="contained"
                                sx={{ ml: 3 }}
                                color="primary"
                            >
                                Login/Register with Google
                            </Button>

                        </div>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/signup" variant="body2" sx={{ mt: 4 }} style={{display: 'block', textAlign: 'right'}}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                            <Grid item >
                                <Link href="/forgot-password" variant="body2" sx={{ mt: 4, ml: 3 }} style={{display: 'block', textAlign: 'right'}}>
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}