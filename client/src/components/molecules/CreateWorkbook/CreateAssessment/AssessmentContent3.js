import React, { useState } from 'react'
import { Grid } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function AssessmentContent3({ item, addContent, removeItem }) {
  const quillRef = React.useRef()
  const [body, setBody] = useState(item.options[0] ? item.options[0] : "")

  const modules = React.useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  }), [])

  return (
    <Grid container
      spacing={3}
      direction="row"
      justifyContent="space-between"
      style={{ marginTop: "0" }}
      alignItems="center"
    >
      <Grid item xs={11} sm={11.5}>
        <label>Content</label>
        <ReactQuill
          ref={quillRef}
          style={{ marginTop: "14px", borderRadius: "4px" }}
          value={body}
          modules={modules}
          theme="snow"
          onChange={(e) => {
            addContent(e)
            setBody(e)
          }}
          placeholder="Type here..." />
      </Grid>
      <Grid item xs={1} sm={0.5} align="right">
        <RemoveIcon onClick={removeItem} style={{ background: "#E85E40", borderRadius: "50%", fill: "white", marginTop: "60px", cursor: "pointer" }} />
      </Grid>
    </Grid>
  )
}