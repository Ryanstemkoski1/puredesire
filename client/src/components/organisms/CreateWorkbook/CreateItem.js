import { Box, Button, Divider, Grid, Modal, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import MenuIcon from '@mui/icons-material/Menu';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import CreateSectionContents from "../../molecules/CreateWorkbook/CreateSectionContents";

export default function CreateItems({ workBookId }) {
  const queryClient = useQueryClient()

  const sectionQuery = useQuery(["bookSection", workBookId], (params) => fetchWorkBook(params.queryKey[1]))
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState({})
  const [deleteItem, setDeleteItem] = useState(false)

  const removeSectionMutation = useMutation(
    (params) => {
      axios
        .put(process.env.REACT_APP_API_URL + `/workbook/delete-section/${workBookId}`, params)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookSection')
        setDeleteItem(false)
        setActiveSection({})
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
      axios
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

  const formik = useFormik({
    initialValues: {
      title: activeSection.title || "",
      description: activeSection.description || "",
      s_header_image: '',
      s_pdf_download: ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const params = {
        sections: [
          {
            _id: activeSection._id,
            title: values.title,
            description: values.description
          }
        ]
      }
      addSectionMutation.mutate(params)
      resetForm()
    }
  })

  if (sectionQuery.isLoading || sectionQuery.isError) return null

  const sectionData = sectionQuery.data?.sections || []

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}>
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
          onClose={() => setDeleteItem(false)}>
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
                      setActiveSection({})
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
                      removeSectionMutation.mutate({ _id: activeSection._id })
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

      {sectionData.map((item, index) => (
        <Box key={index} className="" sx={{ padding: "24px", margin: "20px 0", border: "2px solid #1C988B", borderRadius: "4px" }}>
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
                    setActiveSection(item)
                  }}
                >
                  <ModeEditOutlineOutlinedIcon />
                  <span className="label">Edit</span>
                </Grid>
                <Grid item
                  style={{ display: "flex", cursor: "pointer " }}
                  onClick={() => {
                    setDeleteItem(true)
                    setActiveSection(item)
                  }}
                >
                  <DeleteOutlineOutlinedIcon style={{ fill: 'red' }} />
                  <span className="label">Delete</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ padding: "8px 0" }} />
          {/* <CreateSectionContents workBookId={workBookId} sectionId={item._id} />  */}
          <CreateSectionContents workBookId={workBookId} sectionId='634a7b1def00a15c0cda0519' />
        </Box>
      ))}
    </>
  )
}

const fetchWorkBook = (params) => {
  return axios
    .get(process.env.REACT_APP_API_URL + `/workbook/${params}`)
    .then((response) => response.data)
}