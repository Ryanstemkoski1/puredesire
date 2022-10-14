// EditWorkbook Component for update workbook data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
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

const EditWorkbook = () => {
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
                process.env.REACT_APP_API_URL + "/workbook/update-workbook/" + id
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
                    process.env.REACT_APP_API_URL + "/workbook/update-workbook/" + id,
                    // props.match.params.id,
                    values
                )
                .then((res) => {
                    if (res.status === 200) {
                        alert("Workbook successfully updated");
                        history('/workbook');
                        // props.history.push("/workbook-list");
                    } else Promise.reject();
                })
                .catch((err) => alert(err));
            // alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
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
                <Select
                    required
                    fullWidth
                    name="role"
                    // label="role-label"
                    id="role"
                    label="Role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                >
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                </Select>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};


// Export EditWorkbook Component
export default EditWorkbook;
