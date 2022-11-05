import { Box, Button, Divider, Grid, Modal, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import MenuIcon from '@mui/icons-material/Menu';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import { useDropzone } from "react-dropzone";
import CreateSectionContents from "../../molecules/CreateWorkbook/CreateSectionContents";
import { ProgressBar } from "../../atoms";

export default function CreateItems({ item, workBookId }) {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(false)
  const [progress, setProgress] = useState(0);
  const [headerImage, setHeaderImage] = useState(() => {
    if (item.s_header_image) {
      return [{
        type: "image",
        path: item.s_header_image
      }]
    } else {
      return []
    }
  })
  const [uploadingImg, setUploadingImg] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [pdfDownload, setPdfDownload] = useState(() => {
    if (item.s_pdf_download) {
      return [{
        type: "application/pdf",
        path: item.s_pdf_download
      }]
    } else {
      return []
    }
  })

  const removeSectionMutation = useMutation(
    (params) => {
      return axios
        .put(process.env.REACT_APP_API_URL + `/workbook/delete-section/${workBookId}`, params)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookSection')
        setDeleteItem(false)
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const addSectionMutation = useMutation(
    (params) => {
      return axios
        .put(process.env.REACT_APP_API_URL + `/workbook/update-section/${workBookId}`, params)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookSection')
        setOpen(false)
      },
      onError: (err) => {
        alert(err)
      }
    }
  )

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

  const formik = useFormik({
    initialValues: {
      title: item.title || "",
      description: item.description || "",
      s_header_image: item.s_header_image || "",
      s_pdf_download: item.s_pdf_download || ""
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (fields, { resetForm }) => {
      const params = {
        sections: [
          {
            _id: item._id,
            title: fields.title,
            description: fields.description,
            s_header_image: fields.s_header_image,
            s_pdf_download: fields.s_pdf_download,
          }
        ]
      }
      addSectionMutation.mutate(params)
      resetForm()
    }
  })

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
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
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item align="right">
                    <Button
                      className="btn primary"
                      type="submit">
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormikProvider>
          </Box>
        </Modal>
      )}
      {deleteItem && (
        <Modal
          open={deleteItem}
          onClose={() => setDeleteItem(false)}
        >
          <Box className="delete-modal">
            <div>
              <Typography variant="h1" style={{ padding: "10px" }}>Delete</Typography>
              <Typography>Are you sure you want to delete this?</Typography>
              <Grid container
                justifyContent="space-around"
                style={{ paddingTop: "30px" }}
              >
                <Grid item>
                  <Button
                    className="btn secondary"
                    onClick={() => {
                      setDeleteItem(false)
                    }}
                  >
                    <b>
                      No, go back
                    </b>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="btn third"
                    onClick={() => {
                      removeSectionMutation.mutate({ _id: item._id })
                    }}
                  >
                    <b>
                      Yes, I’m sure
                    </b>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Modal>
      )}

      <Box className="" sx={{ padding: "24px", margin: "20px 0", border: "2px solid #1C988B", borderRadius: "4px" }}>
        <Grid container
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Grid container
              spacing={3}
              direction="row"
              justifyContent=""
              alignItems="center"
            >
              <Grid item>
                <label className="label">Section</label>
              </Grid>
              <Grid item
                style={{ display: "flex" }}
              >
                <MenuIcon style={{ fontSize: "32px" }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container
              spacing={3}
              alignItems="center">
              <Grid item
                style={{ display: "flex", cursor: "pointer " }}
                onClick={() => {
                  setOpen(true)
                }}
              >
                <ModeEditOutlineOutlinedIcon />
                <span className="label">Edit</span>
              </Grid>
              <Grid item
                style={{ display: "flex", cursor: "pointer " }}
                onClick={() => {
                  setDeleteItem(true)
                }}
              >
                <DeleteOutlineOutlinedIcon style={{ fill: 'red' }} />
                <span className="label">Delete</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider style={{ padding: "8px 0" }} />
        <CreateSectionContents workBookId={workBookId} sectionId={item._id} />
      </Box>
    </>
  )
}
