import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AssessmentContent1 from './AssessmentContent1';
import AssessmentContent2 from './AssessmentContent2';
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';


export default function CreateAssessment({ workBookId, sectionId, open }) {
  const queryClient = useQueryClient()
  const [elements, setElements] = useState([])

  const addWorkBookItemMutation = useMutation(
    (params) => {
      return axios
        .post(process.env.REACT_APP_API_URL + `/workbookItem/create-workbookItem/`, params)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sectionItems')
        open()
      },
      onError: (err) => {
        alert(err.message)
      }
    }
  )

  function addItem(type) {
    const key = Date.now();

    switch (type) {
      case "text":
        setElements([...elements, { type: "text", options: [], key: key }])
        break
      case "textarea":
        setElements([...elements, { type: "textarea", options: [], key: key }])
        break
      case "rating":
        setElements([...elements, { type: "rating", options: [], key: key }])
        break
      case "checkbox":
        setElements([...elements, { type: "checkbox", options: [], key: key }])
        break
      case "radio":
        setElements([...elements, { type: "radio", options: [], key: key }])
        break
    }
  }

  const handleRemove = (i) => {
    setElements(elements => elements.filter((e, index) => index !== i))
  }

  const handleRemoveSubItem = (i, j) => {
    setElements(elements => elements.map((e, index) => {
      if (index === i) {
        let newoptions = e.options.filter((item, order) => order !== j)
        e.options = newoptions
        return e
      } else {
        return e
      }
    }))
  }

  const handleAddSubItem = (i) => {
    setElements(elements => elements.map((e, index) => {
      const key = Date.now()
      if (index === i) {
        e.options.push({ value: "item", key: key })
        return e
      } else {
        return e
      }
    }))
  }

  const formik = useFormik({
    initialValues: {
      assessmentTitle: "",
      requiredScore: 1,
      type: 'Assessment',
    },
    enableReinitialize: true,
    validationSchema: "",
    onSubmit: (fields, { resetForm }) => {
      let quesArray = []
      elements.map((item, index) => {
        if (item.type === "checkbox" || item.type === "radio") {
          let optionArr = []
          item.options.map((option, j) => {
            optionArr.push(
              {
                title: fields[`options${index}${j}`],
                points: parseInt(fields[`points${index}${j}`])
              }
            )
          })

          quesArray.push(
            {
              title: fields[`${item.type}${index}`],
              type: item.type,
              options: optionArr
            }
          )
        } else {
          quesArray.push(
            {
              title: fields[`${item.type}${index}`],
              type: item.type,
              points: parseInt(fields[`points${index}`])
            }
          )
        }
      })

      const params = {
        title: fields.assessmentTitle,
        type: fields.type,
        required_score: parseInt(fields.requiredScore),
        workbookid: workBookId,
        sectionid: sectionId,
        questions: quesArray
      }
      console.log(params)
      addWorkBookItemMutation.mutate(params)
      resetForm()
    }
  })

  return (
    <Modal
      open={true}
      onClose={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box className="modal-wrap">
            <label className='label'>Assessment</label>
            <Divider style={{ margin: "20px 0" }} />
            {elements.map((e, i) => {
              if (e.type === "text" || e.type === "textarea" || e.type === "rating") {
                return (
                  <AssessmentContent1 key={e.key} item={e} index={i} removeItem={() => handleRemove(i)} formik={formik} />
                )
              } else {
                return (
                  <AssessmentContent2 key={e.key} item={e} index={i} formik={formik} removeItem={() => handleRemove(i)} addSubItem={() => handleAddSubItem(i)} removeSubitem={(j) => handleRemoveSubItem(i, j)} />
                )
              }
            }
            )}
            <Box
              className="dashed-border"
              sx={{
                minHeight: '180px',
                borderRadius: '4px',
                margin: '20px 0',
                display: "flex",
                alignItems: "center",
                padding: "30px"
              }}
            >
              <Grid container
                spacing={10}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <div className='o_icon_wrapper' onClick={() => addItem('text')}>
                    <AddIcon style={{ fill: "#FFA659" }} />
                  </div>
                  <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Add Text</Typography>
                </Grid>
                <Grid item>
                  <div className='o_icon_wrapper' onClick={() => addItem('textarea')}>
                    <AddIcon style={{ fill: "#FFA659" }} />
                  </div>
                  <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Add Text Area</Typography>
                </Grid>
                <Grid item>
                  <div className='o_icon_wrapper' onClick={() => addItem('rating')}>
                    <AddIcon style={{ fill: "#FFA659" }} />
                  </div>
                  <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Rating(1-10)</Typography>
                </Grid>
                <Grid item>
                  <div className='o_icon_wrapper' onClick={() => addItem('checkbox')}>
                    <AddIcon style={{ fill: "#FFA659" }} />
                  </div>
                  <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Checkboxes</Typography>
                </Grid>
                <Grid item>
                  <div className='o_icon_wrapper' onClick={() => addItem('radio')}>
                    <AddIcon style={{ fill: "#FFA659" }} />
                  </div>
                  <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Radio Buttons</Typography>
                </Grid>
              </Grid>
            </Box>
            <div>
              <Divider style={{ margin: "20px 0" }} />
              <Grid container
                spacing={3}
                direction="row"
                justifyContent="space-between"
                style={{ marginTop: "0" }}
                alignItems="center">
                <Grid item xs={12} sm={8} align="left" style={{ display: "flex", flexDirection: "column" }}>
                  <label>Assessment Title*</label>
                  <TextField
                    margin="normal"
                    required
                    id="assessmentTitle"
                    name="assessmentTitle"
                    // label="Section Title"
                    placeholder="Type here..."
                    value={formik.values.assessmentTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.assessmentTitle && Boolean(formik.errors.assessmentTitle)}
                  />
                </Grid>
                <Grid item xs={12} sm={4} align="left" style={{ display: "flex", flexDirection: "column" }}>
                  <label>Minimum score needed to pass*</label>
                  <TextField
                    type="number"
                    margin="normal"
                    required
                    id="requiredScore"
                    name="requiredScore"
                    // label="Section Title"
                    placeholder="1"
                    value={formik.values.requiredScore}
                    onChange={formik.handleChange}
                    error={formik.touched.requiredScore && Boolean(formik.errors.requiredScore)}
                  />
                </Grid>
              </Grid>
            </div>
            <Grid container
              spacing={3}
              direction="row"
              justifyContent="flex-end"
              style={{ marginTop: "0" }}
              alignItems="center">
              <Grid item align="right">
                <Button
                  className="btn secondary"
                  onClick={open}
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
          </Box>
        </form>
      </FormikProvider>
    </Modal>
  )
}