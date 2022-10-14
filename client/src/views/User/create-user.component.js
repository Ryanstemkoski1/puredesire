// CreateUser Component for add new user

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserForm from "./UserForm";
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
import { useFormik } from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number';

// CreateUser Component
const CreateUser = () => {
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

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            role: 'user',
            password: '',
            phone: '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // signUp(values.email, values.password, values.name, values.role)
            //     .then((data) => {
            //         alert('User successfully created. It has to be activated by the client.');
            //         history('/user');
            //     })
            //     .catch((err) => {
            //         setErrorMessage(err.message);
            //     });
            alert(JSON.stringify(values, null, 2));
        },
    });



    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors }
    // } = useForm({
    //     resolver: yupResolver(validationSchema)
    // });



    // const onSubmit = data => {
    //     signUp(data.email, data.password, data.name, data.role)
    //         .then((data) => {
    //             alert('User successfully created. It has to be activated by the client.');
    //             history('/user');
    //         })
    //         .catch((err) => {
    //             setErrorMessage(err.message);
    //         });
    // };

    // function handleRegister(e) {
    //     // e.preventDefault();
    //     if (email && password) {
    //         if (role){
    //             if (name){
    //                 signUp(email, password)
    //                     .then((data) => {
    //                         alert('User successfully created. It has to be activated by the client.');
    //                         history('/user');
    //                     })
    //                     .catch((err) => {
    //                         setErrorMessage(err.message);
    //                     });
    //             }
    //             else{
    //                 setErrorMessage('Name is required.');
    //             }
    //         }
    //         else{
    //             setErrorMessage('Role is required.');
    //         }
    //     }
    //     else {
    //         setErrorMessage('Email and Password fields are required.');
    //     }
    //
    // }

// Return user form
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
                Create User
            </Typography>
            <form onSubmit={formik.handleSubmit} sx={{ mt: 1 }} style={{width:'90%'}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <MuiPhoneNumber
                    defaultCountry={'us'}
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                {/*<Typography variant="inherit" color="textSecondary">*/}
                {/*    {errors.email?.message}*/}
                {/*</Typography>*/}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                {/*<Typography variant="inherit" color="textSecondary">*/}
                {/*    {errors.password?.message}*/}
                {/*</Typography>*/}
                {/*<Select*/}
                {/*    required*/}
                {/*    fullWidth*/}
                {/*    name="role"*/}
                {/*    label="Role"*/}
                {/*    id="role"*/}
                {/*    onChange={(e) => setRole(e.target.value)}*/}
                {/*    sx={{ mt: 2, mb: 2 }}*/}
                {/*    {...register('role')}*/}
                {/*    error={errors.role ? true : false}*/}
                {/*>*/}
                {/*    <MenuItem value='user'>User</MenuItem>*/}
                {/*    <MenuItem value='admin'>Admin</MenuItem>*/}
                {/*</Select>*/}
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                        required
                        fullWidth
                        label="Role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                        <MenuItem value='user'>User</MenuItem>
                        <MenuItem value='admin'>Admin</MenuItem>
                    </Select>
                </FormControl>
                {/*<Typography variant="inherit" color="textSecondary">*/}
                {/*    {errors.role?.message}*/}
                {/*</Typography>*/}
                <div fullwidth="true" style={{textAlign: 'left', display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent:'space-between'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Add New User
                    </Button>
                </div>
            </form>
        </Box>
    )
}

// Export CreateUser Component
export default CreateUser
