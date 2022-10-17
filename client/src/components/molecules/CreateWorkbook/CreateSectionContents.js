import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import TitleIcon from '@mui/icons-material/Title';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CreateAssessment from './CreateAssessment';
import CreateLesson from './CreateLesson';

export default function CreateSectionContents({ workBookId, sectionId }) {
  const [lesson, setLesson] = useState(false)
  const [assessment, setAssessment] = useState(false)

  return (
    <React.Fragment>
      {lesson && (
        <CreateLesson open={() => setLesson(false)} workBookId={workBookId} sectionId={sectionId} />
      )}
      {assessment && (
        <CreateAssessment open={() => setAssessment(false)} workBookId={workBookId} sectionId={sectionId} />
      )}
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