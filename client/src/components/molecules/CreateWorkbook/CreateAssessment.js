import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export default function CreateAssessment({ workBookId, sectionId, open }) {

  return (
    <Modal
      open={true}
      onClose={open}
    >
      <Box className="modal-wrap">
        <label className='label'>Assessment</label>
        <Divider style={{ margin: "20px 0" }} />
        <Box
          className="dashed-border"
          sx={{
            minHeight: '130px',
            borderRadius: '4px',
            margin: '20px 0',
            display: "flex",
            alignItems: "center"
          }}
        >
          <Grid container
            spacing={10}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <div className='o_icon_wrapper'>
                <AddIcon style={{ fill: "#FFA659" }} />
              </div>
              <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Add Text</Typography>
            </Grid>
            <Grid item>
              <div className='o_icon_wrapper'>
                <AddIcon style={{ fill: "#FFA659" }} />
              </div>
              <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Add Text Area</Typography>
            </Grid>
            <Grid item>
              <div className='o_icon_wrapper'>
                <AddIcon style={{ fill: "#FFA659" }} />
              </div>
              <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Rating(1-10)</Typography>
            </Grid>
            <Grid item>
              <div className='o_icon_wrapper'>
                <AddIcon style={{ fill: "#FFA659" }} />
              </div>
              <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Checkboxes</Typography>
            </Grid>
            <Grid item>
              <div className='o_icon_wrapper'>
                <AddIcon style={{ fill: "#FFA659" }} />
              </div>
              <Typography style={{ color: "#00000099", fontSize: "15px", paddingTop: "5px" }}>Radio Buttons</Typography>
            </Grid>
          </Grid>
        </Box>
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