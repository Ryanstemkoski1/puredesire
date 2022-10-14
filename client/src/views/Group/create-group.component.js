// CreateGroup Component for add new group

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { federatedSignIn, signUp } from "../../utils/cognitoAuth";

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
import Select  from '@mui/material/Select';
import { mainTheme } from '../../mainTheme.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from "../../images/pure-desire-logo-2022.png";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as Yup from 'yup';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

// CreateGroup Component
const CreateGroup = () => {
    const [formValues, setFormValues] = useState({ name: '', email: '', password: '', role: '' })
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState();
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        role: Yup.string()
            .required('Role is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = data => {
        signUp(data.email, data.password, data.name, data.role)
            .then((data) => {
                alert('Group successfully created. It has to be activated by the client.');
                history('/group');
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
        // console.log(JSON.stringify(data, null, 2));
    };

    function handleRegister(e) {
        // e.preventDefault();
        if (email && password) {
            if (role){
                if (name){
                    signUp(email, password)
                        .then((data) => {
                            alert('Group successfully created. It has to be activated by the client.');
                            history('/group');
                        })
                        .catch((err) => {
                            setErrorMessage(err.message);
                        });
                }
                else{
                    setErrorMessage('Name is required.');
                }
            }
            else{
                setErrorMessage('Role is required.');
            }
        }
        else {
            setErrorMessage('Email and Password fields are required.');
        }

    }

// Return group form
    return(
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
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }} style={{width:'90%'}}>
                {errorMessage && (
                    <p className="error"> {errorMessage} </p>
                )}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    {...register('name')}
                    error={errors.name ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.name?.message}
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    // value={email}
                    {...register('email')}
                    error={errors.email ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.email?.message}
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    // value={password}
                    {...register('password')}
                    error={errors.password ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.password?.message}
                </Typography>
                <InputLabel id="role">Role</InputLabel>
                <Select
                    required
                    fullWidth
                    name="role"
                    // label="Role"
                    id="role"
                    // value={role}
                    label="Role"
                    {...register('role')}
                    error={errors.role ? true : false}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                </Select>
                <Typography variant="inherit" color="textSecondary">
                    {errors.role?.message}
                </Typography>
                <div fullwidth="true" style={{textAlign: 'left', display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent:'space-between'}}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1 }}
                    >
                        Add New Group
                    </Button>
                </div>
            </Box>
        </Box>
    )
}

// Export CreateGroup Component
export default CreateGroup
