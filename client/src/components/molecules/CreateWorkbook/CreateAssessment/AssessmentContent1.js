import React, { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import { Grid, TextField } from '@mui/material'

export default function AssessmentContent1({ item, index, removeItem, formik }) {
  const [title, setTitle] = useState("")

  useEffect(() => {
    switch (item.type) {
      case "text":
        setTitle("Text*")
        break
      case "textarea":
        setTitle("Text Area*")
        break
      case "rating":
        setTitle("Rating (1-10)*")
        break
      default:
        break
    }
  }, [item])

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
            sm={10}
            align="left"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>{title}</label>
            <TextField
              margin="normal"
              required
              id={`${item.type}${index}`}
              value={formik.values[`${item.type}${index}`] ? formik.values[`${item.type}${index}`] : ""}
              name={`${item.type}${index}`}
              placeholder="Type here..."
              onChange={formik.handleChange}
            />

          </Grid>
          <Grid item xs={12} sm={2} align="left" style={{ display: "flex", flexDirection: "column" }}>
            <label>Value (for scoring)</label>
            <TextField
              type="number"
              margin="normal"
              required
              id={`points${index}`}
              value={formik.values[`points${index}`] ? formik.values[`points${index}`] : 1}
              name={`points${index}`}
              placeholder="1"
              onChange={formik.handleChange}
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