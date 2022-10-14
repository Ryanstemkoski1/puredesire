// EditUser Component for update user data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

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
import logo from "../../images/pure-desire-logo-2022.png";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as yup from 'yup';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {signUp} from "../../utils/cognitoAuth";
import { useFormik } from 'formik';

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    role: yup.string().required('Role is required'),
});

const EditUser = () => {
    const { id } = useParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useNavigate();

    useEffect(() => {
        axios
            .get(
                process.env.REACT_APP_API_URL + "/user/update-user/" + id
            )
            .then((res) => {
                const { name, email, password, role } = res.data;
                // setFormValues({ name, email, password, role });
                setName(name);
                setEmail(email);
                setRole(role);
                // setValue("name", name);
            })
            .catch((err) => console.log(err));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: name,
            email: email,
            role: role,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios
                .put(
                    process.env.REACT_APP_API_URL + "/user/update-user/" + id,
                    // props.match.params.id,
                    values
                )
                .then((res) => {
                    if (res.status === 200) {
                        alert("User successfully updated");
                        history('/user');
                        // props.history.push("/user-list");
                    } else Promise.reject();
                })
                .catch((err) => alert(err));
            // alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Box
            sx={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems:'start'
            }}
        >
            <Typography color="primary.neutral" component="h1" variant="h1" sx={{ mb: 2 }}>
                Edit User
            </Typography>
            <form onSubmit={formik.handleSubmit} sx={{ mt: 1 }} style={{width:'90%'}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    disabled
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                {/*<Select*/}
                {/*    required*/}
                {/*    fullWidth*/}
                {/*    name="role"*/}
                {/*    id="role"*/}
                {/*    label="Role"*/}
                {/*    sx={{ mt: 2, mb: 2 }}*/}
                {/*    value={formik.values.role}*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    error={formik.touched.role && Boolean(formik.errors.role)}*/}
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
                <div fullwidth="true" style={{textAlign: 'left', display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent:'space-between'}}>

                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
                </div>
            </form>
        </Box>
    );
};


// Export EditUser Component
export default EditUser;
