import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function LeftNav({ section, index, workbookItems, changeItemContent }) {
  const [show, setShow] = useState(false)

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "block" }
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          cursor: "pointer"
        }}
        onClick={() => setShow(!show)}
      >
        <Box
          sx={{
            paddingRight: "10px"
          }}
        >
          <CheckCircleIcon style={{ width: "15px" }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#4C4C4C" }}>{section.title}</Typography>
          <Typography sx={{ fontSize: "15px", color: "#4C4C4C" }}>{section.description}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          paddingLeft: "20px",
          maxHeight: "1000px",
        }}
        className={show ? "" : "nav dropdown"}
      >
        {!!workbookItems && workbookItems.map((workbookitem, i) => {
          if (workbookitem.sectionid === section._id) {
            return (
              <Box
                key={workbookitem._id}
                sx={{
                  display: "flex",
                  padding: "10px",
                  cursor: "pointer"
                }}
                onClick={() => changeItemContent(workbookitem)}
              >
                <Box
                  sx={{
                    paddingRight: "10px"
                  }}
                >
                  <RadioButtonUncheckedIcon style={{ width: "15px" }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#4C4C4C" }}>{section.title}</Typography>
                  <Typography sx={{ fontSize: "15px", color: "#4C4C4C" }}>{section.description}</Typography>
                </Box>
              </Box>
            )
          }
        })}
      </Box>
    </Box>
  )
}