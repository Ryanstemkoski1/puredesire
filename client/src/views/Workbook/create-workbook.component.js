import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as Yup from 'yup';
import { useFormik, Field, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import { useDropzone } from "react-dropzone";
import Thumb from "./Thumb";
import ColorPicker from 'mui-color-picker'
import { ColorPickerField } from 'mui-color-picker';
import { Divider } from "../../components/atoms";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CreateWorkbook = () => {
    const history = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        // email: Yup.string()
        //     .required('Email is required')
        //     .email('Email is invalid'),
        // password: Yup.string()
        //     .matches(
        //         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //         "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        //     ),
        // role: Yup.string()
        //     .required('Role is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            sku: '',
            scoring: false,
            description: '',
            colorMain: '#000000',
            colorLightShade: '#000000',
            colorDarkShade: '#000000',
            colorBackground: '#000000',
            file_cover: [],
            file_header: [],
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('sku', values.sku);
            formData.append('scoring', values.scoring);
            formData.append('description', values.description);
            formData.append('colorMain', values.colorMain);
            formData.append('colorLightShade', values.colorLightShade);
            formData.append('colorDarkShade', values.colorDarkShade);
            formData.append('colorBackground', values.colorBackground);
            formData.append('file_cover', values.file_cover[0]);
            formData.append('file_header', values.file_header[0]);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                maxContentLength: 10000000,
                maxBodyLength: 10000000,
            };

            axios
                .post(process.env.REACT_APP_API_URL + "/workbook/create-workbook", formData, config)
                .then((res) => {
                    if (res.status === 200) {
                        history(`workbook/edit-workbook/${res.data.workbookId}`);
                    } else Promise.reject();
                })
                .catch((err) => alert(err));
        },
    });

    const UploadComponent = props => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            accept: { 'image/*': [] },
            onDrop: acceptedFiles => {
                formik.setFieldValue("file_cover", acceptedFiles);
            }
        });
        return (
            <div>
                { }
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} multiple={false} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                </div>
            </div>
        );
    };

    const UploadComponentHeader = props => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            accept: { 'image/*': [] },
            onDrop: acceptedFiles => {
                formik.setFieldValue("file_header", acceptedFiles);
            }
        });
        return (
            <div>
                { }
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} multiple={false} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <div className="workbookForm" align="left" style={{ minHeight: '55vh' }}>
                <Typography color="primary.neutral" component="h1" variant="h1" sx={{ mb: 2 }}>
                    Create New Workbook
                </Typography>
                <Divider />
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container
                            spacing={3}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="sku"
                                    name="sku"
                                    label="SKU"
                                    value={formik.values.sku}
                                    onChange={formik.handleChange}
                                    error={formik.touched.sku && Boolean(formik.errors.sku)}
                                    helperText={formik.touched.sku && formik.errors.sku}
                                />
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formik.values.scoring}
                                            onChange={formik.handleChange}
                                            // error={formik.touched.scoring && Boolean(formik.errors.scoring)}
                                            name="scoring" />
                                    }
                                    label="Scoring"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <Grid container
                            spacing={3}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                            className="fileDrop">
                            <Grid item xs={12} sm={6}>
                                <div className="form-group">
                                    <label htmlFor="file" className="label">Workbook Cover Image*</label>
                                    <UploadComponent setFieldValue={formik.setFieldValue} />
                                    <Typography>Recommended dimensions: 1200x1200</Typography>
                                    {formik.values.file_cover &&
                                        formik.values.file_cover.map((file, i) => (
                                            <div key={i} style={{ position: "relative", width: "fit-content" }}>
                                                < Thumb file={file} />
                                                <DeleteForeverIcon
                                                    style={{ cursor: "pointer", position: "absolute" }}
                                                    onClick={() => {
                                                        formik.setFieldValue("file_cover", []);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div className="form-group">
                                    <label htmlFor="file" className="label">Workbook Header Image*</label>

                                    <UploadComponentHeader setFieldValue={formik.setFieldValue} />
                                    <Typography>Recommended dimensions: 1200x500</Typography>
                                    {formik.values.file_header &&
                                        formik.values.file_header.map((file, i) => (
                                            <div key={i} style={{ position: "relative", width: "fit-content" }}>
                                                < Thumb file={file} />
                                                <DeleteForeverIcon
                                                    style={{ cursor: "pointer", position: "absolute" }}
                                                    onClick={() => {
                                                        formik.setFieldValue("file_header", []);
                                                    }}
                                                />
                                            </div>
                                        ))}

                                </div>
                            </Grid>
                        </Grid>

                        <Grid container
                            spacing={3}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">
                            <Grid item xs={12} sm={7}>
                                <Grid container
                                    spacing={3}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center">
                                    <Grid item xs={12} sm={3}>
                                        <div className="colorPicker">
                                            <div className="pickerWrap">
                                                <ColorPicker
                                                    name='colorMain'
                                                    defaultValue='#000000'
                                                    value={formik.values.colorMain}
                                                    type={'color'}
                                                    // onChange={color => console.log(color)}
                                                    // onChange={formik.values.setFieldValue("color", color)}
                                                    onChange={colorMain => formik.setFieldValue("colorMain", colorMain)}
                                                />
                                                <Field
                                                    name="colorMain"
                                                    component={ColorPickerField}
                                                    className="pickerText"
                                                />
                                            </div>
                                            <span>Main color</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <div className="colorPicker">
                                            <div className="pickerWrap">
                                                <ColorPicker
                                                    name='colorLightShade'
                                                    defaultValue='#000000'
                                                    value={formik.values.colorLightShade}
                                                    type={'color'}
                                                    // onChange={color => console.log(color)}
                                                    // onChange={formik.values.setFieldValue("color", color)}
                                                    onChange={colorLightShade => formik.setFieldValue("colorLightShade", colorLightShade)}
                                                />
                                                <Field
                                                    name="colorLightShade"
                                                    component={ColorPickerField}
                                                    className="pickerText"
                                                />
                                            </div>
                                            <span>Light shade</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <div className="colorPicker">
                                            <div className="pickerWrap">
                                                <ColorPicker
                                                    name='colorDarkShade'
                                                    defaultValue='#000000'
                                                    value={formik.values.colorDarkShade}
                                                    type={'color'}
                                                    // onChange={color => console.log(color)}
                                                    // onChange={formik.values.setFieldValue("color", color)}
                                                    onChange={colorDarkShade => formik.setFieldValue("colorDarkShade", colorDarkShade)}
                                                />
                                                <Field
                                                    name="colorDarkShade"
                                                    component={ColorPickerField}
                                                    className="pickerText"
                                                />
                                            </div>
                                            <span>Dark shade</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <div className="colorPicker">
                                            <div className="pickerWrap">
                                                <ColorPicker
                                                    name='colorBackground'
                                                    defaultValue='#000000'
                                                    value={formik.values.colorBackground}
                                                    type={'color'}
                                                    // onChange={color => console.log(color)}
                                                    // onChange={formik.values.setFieldValue("color", color)}
                                                    onChange={colorBackground => formik.setFieldValue("colorBackground", colorBackground)}
                                                />
                                                <Field
                                                    name="colorBackground"
                                                    component={ColorPickerField}
                                                    className="pickerText"
                                                />
                                            </div>
                                            <span>Background color</span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={4} align="right">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mr: 3 }}>
                                    Preview
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit">
                                    Save and Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FormikProvider >
            </div>
        </Paper>
    );
}

export default CreateWorkbook
