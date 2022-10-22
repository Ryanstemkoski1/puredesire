import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AssessmentContent from './AssessmentContent';
import { element } from 'prop-types';

export default function CreateAssessment({ workBookId, sectionId, open }) {
  const [showKey, setShowKey] = useState(false)
  const [elements, setElements] = useState([])

  function addItem(type) {
    if (!showKey) setShowKey(true)
    switch (type) {
      case "text":
        setElements([...elements, { type: "text", options: [] }])
        break
      case "textarea":
        setElements([...elements, { type: "textarea", options: [] }])
        break
      case "rating":
        setElements([...elements, { type: "rating", options: [] }])
        break
      case "checkbox":
        setElements([...elements, { type: "checkbox", options: [] }])
        break
      case "radio":
        setElements([...elements, { type: "radio", options: [] }])
        break
    }
  }

  const handleRemove = (i) => {
    setElements(elements => elements.filter((e, index) => index !== i))
  }

  return (
    <Modal
      open={true}
      onClose={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box className="modal-wrap">
        <label className='label'>Assessment</label>
        <Divider style={{ margin: "20px 0" }} />
        {elements.map((e, i) =>
          <AssessmentContent key={i} element={e} removeItem={() => handleRemove(i)} />
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
        {showKey && (
          <div>
            <Divider style={{ margin: "20px 0" }} />
            <Grid container
              spacing={3}
              direction="row"
              justifyContent="space-between"
              style={{ marginTop: "0" }}
              alignItems="center">
              <Grid item xs={12} sm={8} align="left" style={{ display: "flex", flexDirection: "column" }}>
                <label>Title</label>
                <TextField
                  margin="normal"
                  required
                  id="lessonTitle"
                  name="lessonTitle"
                  // label="Section Title"
                  placeholder="Type here..."
                />
              </Grid>
              <Grid item xs={12} sm={4} align="left" style={{ display: "flex", flexDirection: "column" }}>
                <label>Minimum score needed to pass</label>
                <TextField
                  margin="normal"
                  required
                  id="lessonTitle"
                  name="lessonTitle"
                  // label="Section Title"
                  placeholder="Type here..."
                />
              </Grid>
            </Grid>
          </div>
        )}
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
    </Modal>
  )
}