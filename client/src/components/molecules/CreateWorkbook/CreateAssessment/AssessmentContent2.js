import React, { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Grid, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function AssessmentContent2({ item, removeItem, formik, index, addSubItem, removeSubitem }) {
  const [title, setTitle] = useState("")
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(item.options)
    switch (item.type) {
      case "checkbox":
        setTitle("Checkboxes*")
        break
      case "radio":
        setTitle("Radio Buttons*")
        break
      default:
        break
    }
  }, [item, item.options])

  return (
    <React.Fragment>
      <Grid container
        spacing={3}
        direction="row"
        justifyContent="space-between"
        style={{ marginTop: "0" }}
      >
        <Grid item xs={11} sm={11.5}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <label>{title}</label>
            <TextField
              margin="normal"
              required
              placeholder="Type here..."
              id={`${item.type}${index}`}
              value={formik.values[`${item.type}${index}`]}
              name={`${item.type}${index}`}
              onChange={formik.handleChange}
            />
          </Box>

        </Grid>
        <Grid item xs={1} sm={0.5} align="right">
          <RemoveIcon onClick={removeItem} style={{ background: "#E85E40", borderRadius: "50%", fill: "white", marginTop: "55px", cursor: "pointer" }} />
        </Grid>
      </Grid>
      {
        options.map((e, j) =>
          <Grid container
            spacing={3}
            direction="row"
            justifyContent="flex-end"
            style={{ marginTop: "0" }}
            alignItems="center"
            key={e.key}
          >
            <Grid item xs={10.5} sm={11}>
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
                  <label>Options*</label>
                  <TextField
                    margin="normal"
                    required
                    name={`options${index}${j}`}
                    id={`options${index}${j}`}
                    value={formik.values[`options${index}${j}`]}
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
                    name={`points${index}${j}`}
                    id={`points${index}${j}`}
                    value={formik.values[`points${index}${j}`]}
                    placeholder="1"
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} sm={0.5} align="right">
              <RemoveIcon onClick={() => { removeSubitem(j) }} style={{ background: "#E85E40", borderRadius: "50%", fill: "white", marginTop: "60px", cursor: "pointer" }} />
            </Grid>
          </Grid>
        )
      }
      <div className='e_icon_wrapper' onClick={addSubItem}>
        <AddIcon style={{ fill: "#fff" }} />
      </div>
    </React.Fragment>
  )
}