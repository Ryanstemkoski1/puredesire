import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { mainTheme } from '../../mainTheme.js';
import { federatedSignIn, signUp } from "../../utils/cognitoAuth";
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from "../../images/pure-desire-logo-2022.png";


export default function SignUp() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function handleRegister(e) {
        // e.preventDefault();
        if (registerEmail && registerPassword) {
            signUp(registerEmail, registerPassword)
                .then((data) => {
                    navigate('/?message=Please%20activate%20your%20account');
                    // return(
                    //     <Navigate to={{
                    //         pathname: '/',
                    //         state: { id: '123' }
                    //     }}
                    //     />
                    // )
                })
                .catch((err) => {
                    setErrorMessage(err.message);
                });
        }
        else {
            setErrorMessage('Email and Password fields are required.');
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        handleRegister();
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
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'start'
                    }}
                >

                    <Typography color="primary.neutral" component="h1" variant="h1" sx={{ mb: 2 }}>
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{width:'90%'}}>
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
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
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            value={registerEmail}
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
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            value={registerPassword}
                        />
                        <div fullWidth style={{textAlign: 'left', display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent:'space-between'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 1 }}
                            >
                                Register
                            </Button>
                            <Button
                                onClick={() => federatedSignIn("Google")}
                                variant="contained"
                                sx={{ mt: 1, ml: 0 }}
                            >
                                Login/Register with Google
                            </Button>

                            <Link href="/" variant="body2" sx={{ mt: 1 }}>
                                {"Sign In"}
                            </Link>
                        </div>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}



// import React, { useState } from "react";
// import { signUp } from "../../utils/cognitoAuth";
//
// export default function Register() {
//     const [registerEmail, setRegisterEmail] = useState("");
//     const [registerPassword, setRegisterPassword] = useState("");
//
//     function handleRegister(e) {
//         e.preventDefault();
//         signUp(registerEmail, registerPassword).catch((err) =>
//             console.log(err)
//         );
//     }
//     return (
//         <>
//             <h3>Register</h3>
//             <form onSubmit={handleRegister}>
//                 <input
//                     placeholder="email"
//                     onChange={(e) => setRegisterEmail(e.target.value)}
//                     value={registerEmail}
//                 />
//                 <input
//                     type="password"
//                     onChange={(e) => setRegisterPassword(e.target.value)}
//                     value={registerPassword}
//                     placeholder="password"
//                 />
//                 <button>Register</button>
//             </form>
//         </>
//     );
// }
