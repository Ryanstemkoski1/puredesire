import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import { Grid, TextField } from '@mui/material'

export default function AssessmentContent({ element, removeItem }) {

  return (
    <Grid container
      spacing={3}
      direction="row"
      justifyContent="space-between"
      style={{ marginTop: "0" }}
      alignItems="center"
    >
      <Grid item xs={11} sm={11.5}>
        <Grid container
          spacing={3}
          direction="row"
          justifyContent="space-between"
          style={{ marginTop: "0" }}
          alignItems="center">
          <Grid item xs={12} sm={6} align="left" style={{ display: "flex", flexDirection: "column" }}>
            <label>Assessment Key</label>
            <TextField
              margin="normal"
              required
              id="lessonTitle"
              name="lessonTitle"
              // label="Section Title"
              placeholder="Type here..."
            />
          </Grid>
          <Grid item xs={12} sm={6} align="left" style={{ display: "flex", flexDirection: "column" }}>
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
      </Grid>
      <Grid item xs={1} sm={0.5} align="right">
        <RemoveIcon onClick={removeItem} style={{ background: "#E85E40", borderRadius: "50%", fill: "white", marginTop: "60px", cursor: "pointer" }} />
      </Grid>
    </Grid>
  )
}