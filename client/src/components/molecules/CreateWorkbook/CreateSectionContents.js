import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import TitleIcon from '@mui/icons-material/Title';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateAssessment from './CreateAssessment';
import CreateLesson from './CreateLesson';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import EditLessn from './EditLesson';

export default function CreateSectionContents({ workBookId, sectionId }) {
  const queryClient = useQueryClient()

  const [lesson, setLesson] = useState(false)
  const [assessment, setAssessment] = useState(false)
  const [deleteItem, setDeleteItem] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState({})


  const itemQuery = useQuery(["sectionItems", sectionId], (params) => fetchWorkBookItems(params.queryKey[1]))

  const removeItemMutation = useMutation(
    (params) => {
      axios
        .delete(process.env.REACT_APP_API_URL + `/workbookItem/delete-workbookitem/${params._id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sectionItems')
        setDeleteItem(false)
        setActiveItem({})
      },
      onError: (err) => {

      }
    }
  )

  const sectionItems = itemQuery.data || []

  return (
    <React.Fragment>
      {lesson && (
        <CreateLesson open={() => setLesson(false)} workBookId={workBookId} sectionId={sectionId} />
      )}
      {assessment && (
        <CreateAssessment open={() => setAssessment(false)} workBookId={workBookId} sectionId={sectionId} />
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
                      setActiveItem({})
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
                      removeItemMutation.mutate({ _id: activeItem._id })
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

      {open && (
        activeItem.type === "Lesson" ?
          <EditLessn item={activeItem} close={() => setOpen(false)} /> :
          ""
      )}

      {!!sectionItems.length && sectionItems.map((item, index) => (
        <Box key={index} sx={{ padding: "24px", margin: "20px 0", border: "2px solid #FFA659", borderRadius: "4px" }}>
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
                  <label className="label">{item.type}</label>
                </Grid>
                <Grid item
                  style={{ display: "flex" }}
                >
                  <MenuIcon style={{ fontSize: "32px", fill: "#FFA659" }} />
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
                    setActiveItem(item)
                  }}
                >
                  <ModeEditOutlineOutlinedIcon />
                  <span className="label">Edit</span>
                </Grid>
                <Grid item
                  style={{ display: "flex", cursor: "pointer " }}
                  onClick={() => {
                    setDeleteItem(true)
                    setActiveItem(item)
                  }}
                >
                  <DeleteOutlineOutlinedIcon style={{ fill: 'red' }} />
                  <span className="label">Delete</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ))}

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
            <div className='icon_wrapper' onClick={() => setLesson(true)}>
              <TitleIcon style={{ fill: "#ffffff" }} />
            </div>
          </Grid>
          <Grid item>
            <div className='icon_wrapper' onClick={() => setAssessment(true)}>
              <AssignmentOutlinedIcon style={{ fill: "#ffffff" }} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

const fetchWorkBookItems = (id) =>
  axios
    .get(process.env.REACT_APP_API_URL + `/workbookItem/${id}`)
    .then((response) => response.data)

