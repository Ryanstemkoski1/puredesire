import React, { useState } from 'react'
import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function CreateLesson({ workBookId, sectionId, open }) {
  const quillRef = React.useRef();
  const queryClient = useQueryClient()
  const [body, setBody] = useState('')

  const imageHandler = async (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        // console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
        const url = res.imageurl
        const server_url = process.env.REACT_APP_API_URL
        editor.insertEmbed(editor.getSelection(), "image", `${server_url}/${url}`);
      } else {
        alert('You could only upload images.');
      }
    };
  }

  const modules = React.useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        ["link", "image"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), [])


  const validationSchema = Yup.object().shape({
    lessonTitle: Yup.string().required('Title is required'),
  });

  const addWorkBookItemMutation = useMutation(
    (params) => {
      axios
        .post(process.env.REACT_APP_API_URL + `/workbookItem/create-workbookItem/`, params)
    },
    {
      onSuccess: () => {
        open()
      },
      onError: (err) => {
        alert(err.message)
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      lessonTitle: '',
      lessonDescription: '',
      type: 'Lesson'
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (fields, { resetForm }) => {

      const params = {
        title: fields.lessonTitle,
        description: fields.lessonDescription,
        content: body,
        type: fields.type,
        workbookid: workBookId,
        sectionid: sectionId
      }
      addWorkBookItemMutation.mutate(params)

      resetForm()
      setBody('')
    }
  })

  return (
    <React.StrictMode>
      <Modal
        open={true}
        onClose={open}
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
                  <label htmlFor="file" className="label">Lesson Title*</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lessonTitle"
                    name="lessonTitle"
                    // label="Section Title"
                    placeholder="Type here..."
                    value={formik.values.lessonTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.lessonTitle && Boolean(formik.errors.lessonTitle)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label htmlFor="file" className="label">Lesson Description</label>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="lessonDescription"
                    name="lessonDescription"
                    // label="Section Description"
                    placeholder="Type here..."
                    value={formik.values.lessonDescription}
                    onChange={formik.handleChange}
                    error={formik.touched.lessonDescription && Boolean(formik.errors.lessonDescription)}
                  />
                </Grid>
              </Grid>
              <Grid style={{ marginTop: "20px" }}>
                <label htmlFor="file" className="label">Lesson Content*</label>
                <ReactQuill ref={quillRef} style={{ marginTop: "14px", borderRadius: "4px" }} value={body} modules={modules} theme="snow" onChange={setBody} placeholder="Type here..." />
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
            </form>
          </FormikProvider>
        </Box>
      </Modal>
    </React.StrictMode>
  )
}

const ImageUpload = (file) =>
  axios
    .post(process.env.REACT_APP_API_URL + "/workbookItem/uploads", file)
    .then(res => res.data)


const isFilenameValid = (filename) => {
  return !(new RegExp("[<>:/\\|?*\"]|[\\0-\\31]").test(filename) || filename.length > 255);
}
