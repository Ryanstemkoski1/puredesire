import React, { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import { Grid, TextField } from '@mui/material'

export default function AssessmentContent({ element, removeItem }) {
  const [title, setTitle] = useState("")

  useEffect(() => {
    switch (element.type) {
      case "text":
        setTitle("Text*")
        break
      case "textarea":
        setTitle("Text Area*")
        break
      case "rating":
        setTitle("Rating (1-10)*")
        break
      case "checkbox":
        setTitle("Checkboxes*")
        break
      case "radio":
        setTitle("Radio Buttons*")
        break
      default:
        break
    }
  }, [element])

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
          <Grid item
            xs={12}
            sm={title === "Checkboxes*" ? 12 : title === "Radio Buttons*" ? 12 : 10}
            align="left"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>{title}</label>
            <TextField
              margin="normal"
              required
              id="lessonTitle"
              name="lessonTitle"
              placeholder="Type here..."
            />
          </Grid>
          {
            title === "Text*" && (
              <Grid item xs={12} sm={2} align="left" style={{ display: "flex", flexDirection: "column" }}>
                <label>Value (for scoring)</label>
                <TextField
                  margin="normal"
                  required
                  id="lessonTitle"
                  name="lessonTitle"
                  placeholder="Type here..."
                />
              </Grid>
            )
          }
        </Grid>
      </Grid>
      <Grid item xs={1} sm={0.5} align="right">
        <RemoveIcon onClick={removeItem} style={{ background: "#E85E40", borderRadius: "50%", fill: "white", marginTop: "60px", cursor: "pointer" }} />
      </Grid>
    </Grid>
  )
}