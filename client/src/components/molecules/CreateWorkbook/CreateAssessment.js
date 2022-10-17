import { Box, Modal } from '@mui/material'
import React from 'react'

export default function CreateAssessment({ workBookId, sectionId, open }) {

  return (
    <Modal
      open={true}
      onClose={open}
    >
      <Box className="modal-wrap">
        <label className='label'>Assessment</label>
      </Box>
    </Modal>
  )
}