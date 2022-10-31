import React, { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import { useMutation, useQueryClient } from "react-query"
import { ProgressBar } from "../../atoms";
import EditWorkbook from "./EditWorkBook";

export default function CreateSection({ workBookId, workBook }) {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [editWorkbook, setEditWorkbook] = useState(false)
  const [progress, setProgress] = useState(0);
  const [headerImage, setHeaderImage] = useState([])
  const [uploadingImg, setUploadingImg] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [pdfDownload, setPdfDownload] = useState([])

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const addSectionMutation = useMutation(
    (params) => {
      return axios
        .put(process.env.REACT_APP_API_URL + `/workbook/add-section/${workBookId}`, params, {
          maxContentLength: 10000000,
          maxBodyLength: 10000000,
        })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookSection"])
        setOpen(false)
      },
      onError: (err) => {
        alert(err)
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      s_header_image: '',
      s_pdf_download: ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const params = {
        sections: [
          {
            title: values.title,
            description: values.description,
            s_header_image: values.s_header_image,
            s_pdf_download: values.s_pdf_download,
          }
        ]
      }
      addSectionMutation.mutate(params)
      resetForm()
      setHeaderImage([])
      setPdfDownload([])
      // axios
      //   .put(`http://localhost:5000/workbook/add-section/${workBookId}`, params)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       setOpen(false)
      //     } else Promise.reject();
      //   })
      //   .catch((err) => alert(err));
    }
  })

  const UploadImage = () => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: { 'image/*': [] },
      onDrop: (acceptedFiles) => {
        const config = {
          headers: {
            'content-type': 'multipart/form-data;boundary=MyBoundary'
          },
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          }
        };
        let fd = new FormData();
        fd.append('s_header_image', acceptedFiles[0])
        setHeaderImage(acceptedFiles)
        setUploadingImg(acceptedFiles.length > 0)
        axios
          .post(process.env.REACT_APP_API_URL + "/workbook/uploads", fd, config)
          .then((res) => {
            setUploadingImg(false)
            if (res.status === 200) {
              formik.setFieldValue('s_header_image', res.data.s_header_image)

            } else Promise.reject();
          })
          .catch((err) => alert('Upload a valid file format or reduce the file size.'));
      }
    });
    return (
      <div>
        { }
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} multiple={false} />
          <Typography style={{ fontSize: '18px', fontWeight: "500", color: "#00000099" }}>Drag and Drop</Typography>
          <Typography style={{ fontSize: '14px' }}>your files here, or browse</Typography>
        </div>
      </div>
    );
  };

  const UploadPDF = () => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: { 'application/pdf': [] },
      onDrop: (acceptedFiles) => {
        const config = {
          headers: {
            'content-type': 'multipart/form-data;boundary=MyBoundary'
          },
          maxContentLength: 10000000,
          maxBodyLength: 10000000,
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          }
        };
        let fd = new FormData();
        fd.append('s_pdf_download', acceptedFiles[0])
        setPdfDownload(acceptedFiles)
        setUploadingPdf(acceptedFiles.length > 0)
        axios
          .post(process.env.REACT_APP_API_URL + "/workbook/uploads", fd, config)
          .then((res) => {
            setUploadingPdf(false)
            if (res.status === 200) {
              formik.setFieldValue('s_pdf_download', res.data.s_pdf_download)

            } else Promise.reject();
          })
          .catch((err) => alert('Upload a valid file format or reduce the file size.'));
      }
    });
    return (
      <div>
        { }
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} multiple={false} />
          <Typography style={{ fontSize: '18px', fontWeight: "500", color: "#00000099" }}>Drag and Drop</Typography>
          <Typography style={{ fontSize: '14px' }}>your files here, or browse</Typography>
        </div>
      </div>
    );
  };

  const closeModal = () => {
    setOpen(false)
  }

  const removeMedia = (path) => {
    let imgPath = ''
    if (formik.values.s_header_image.includes(path)) imgPath = formik.values.s_header_image
    else if (formik.values.s_pdf_download.includes(path)) imgPath = formik.values.s_pdf_download

    if (imgPath) {
      const data = {
        path: imgPath
      }

      axios
        .post(process.env.REACT_APP_API_URL + "/workbook/delete", data)
        .then((res) => {
          if (res.status === 200) {
          } else Promise.reject();
        })
        .catch((err) => {
          console.log(err)
        });

      if (formik.values.s_header_image.includes(path)) {
        setHeaderImage([])
        formik.setFieldValue('s_header_image', '')
      } else if (formik.values.s_pdf_download.includes(path)) {
        setPdfDownload([])
        formik.setFieldValue('s_pdf_download', '')
      }
    }
  }

  return (
    <React.Fragment>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          style={{ overflow: "scroll" }}
        >
          <Box className="modal-wrap">
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container
                  spacing={3}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <label htmlFor="file" className="label">Section Title*</label>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      name="title"
                      // label="Section Title"
                      placeholder="Type here..."
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label htmlFor="file" className="label">Section Description</label>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="description"
                      name="description"
                      // label="Section Description"
                      placeholder="Type here..."
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                    />
                  </Grid>
                </Grid>
                <Grid container
                  spacing={3}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  className="fileDrop">
                  <Grid item xs={12} sm={6}>
                    <div className="form-group" style={{ marginBottom: "0" }}>
                      <label htmlFor="file" className="label">Section Header Image</label>
                      <UploadImage />
                      <Typography style={{ padding: "10px 0", fontSize: '14px', color: "#00000099" }}>Recommended dimensions: 1200x500</Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div className="form-group" style={{ marginBottom: "0" }}>
                      <label htmlFor="file" className="label">PDF Download</label>
                      <UploadPDF />
                    </div>
                    <ProgressBar file={headerImage} uploading={uploadingImg} progress={progress} removeMedia={removeMedia} />
                    <ProgressBar file={pdfDownload} uploading={uploadingPdf} progress={progress} removeMedia={removeMedia} />
                  </Grid>
                </Grid>

                <Grid container
                  spacing={3}
                  direction="row"
                  justifyContent="flex-end"
                  style={{ marginTop: "0" }}
                  alignItems="center">
                  <Grid item align="right">
                    <Button
                      className="btn secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item align="right">
                    <Button
                      className="btn primary"
                      type="submit">
                      Save and Exit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormikProvider>
          </Box>
        </Modal>
      )}
      {editWorkbook && (
        <EditWorkbook close={() => setEditWorkbook(false)} workBook={workBook} />
      )}
      <Box
        className="dashed-border"
        sx={{
          minHeight: '150px',
          borderRadius: '4px',
          margin: '20px 0',
          cursor: 'pointer'
        }}
        onClick={() => { setOpen(true) }}
      >
        <AddCircleIcon className="position-center" style={{ width: '50px', height: '50px' }} />
      </Box>
      <Grid container
        spacing={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Grid item>
          <Button
            className="btn primary"
            onClick={() => setEditWorkbook(true)}
          >
            Workbook Settings
          </Button>
        </Grid>
        <Grid item>
          <Button
            className="btn primary"
          >
            Publish
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}