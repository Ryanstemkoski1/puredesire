import React, { useEffect, useState } from "react";
import { Box, Grid, Link, Paper, Skeleton, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query";
import axios from "axios";
import { RadarChart } from "recharts";

export default function LibraryItemData() {
  const param = useParams()
  const [activeItem, setActiveItem] = useState({})

  const workBookQuery = useQuery("workbook", () => axios.get(process.env.REACT_APP_API_URL + "/workbook/" + param.id).then(res => res.data))
  const workBookItemQuery = useQuery("sectionItems", () => axios.post(process.env.REACT_APP_API_URL + "/workbookItem/allitems", {
    workbookid: param.id
  }).then(res => res.data))

  const workbook = workBookQuery.data || {}
  const workbookItems = workBookItemQuery.data || []
  useEffect(() => {
    if (!!workbookItems.length) {
      setActiveItem(workbookItems[0])
    }
  }, [workbookItems])

  const itemContent = (item) => {
    if (!!item && item.type === "Lesson") {
      return (
        <Box
          sx={{ marginTop: "100px", paddingLeft: { lg: "30px" }, textAlign: "left" }}
        >
          <Typography
            sx={{
              fontSize: { sm: '32px', xs: '24px' },
              color: "#4C4C4C",
              lineHeight: 1,
              fontWeight: 500
            }} >{item.title}</Typography>
          <Box
            sx={{
              color: "#4C4C4C",
              marginTop: "40px"
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: item.content }}>
            </div>
          </Box>
        </Box>
      )
    } else if (!!item && item.type === "Assessment") {
      return (
        <Box
          sx={{ marginTop: "100px", paddingLeft: "30px" }}
        >
          <Typography
            sx={{
              fontSize: { sm: '32px', xs: '24px' },
              color: "#4C4C4C",
              lineHeight: 1,
              fontWeight: 500
            }} >{item.title}</Typography>
          <Box>
            {item.content}
          </Box>
        </Box>
      )
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box>
            <Box sx={{ position: { lg: "fixed" }, maxWidth: { lg: "300px" }, textAlign: "left" }}>
              <Link href="/library" >
                <span style={{ fontSize: "14px", cursor: "pointer", color: "#1A9182", fontWeight: "600" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="7.27" height="12.335" viewBox="0 0 7.27 12.335" style={{ marginRight: "10px" }}>
                    <path id="Path_170" data-name="Path 170" d="M6.162,0,0,6.168l6.168,6.168,1.1-1.1L2.206,6.168,7.27,1.1Z" transform="translate(0)" fill="#1a9182" />
                  </svg>
                  Back
                </span>
              </Link>
              <Typography
                sx={{
                  fontSize: { sm: '32px', xs: '24px' },
                  color: "#4C4C4C",
                  lineHeight: 1,
                  fontWeight: 500
                }} >{workbook.title}</Typography>

              <Box sx={{ marginTop: "60px", background: "#EFEFEF", maxHeight: "60vh", borderRadius: "9px", padding: "15px 0", overflowY: "scroll" }} className="no-scroll">
                {!!workbook.sections && workbook.sections.map((section, i) => (
                  <Box key={section._id}>
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
                      // onClick = {() => setActiveItem(section)}
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
                        }}
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
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ marginLeft: { lg: "310px" } }}>
              {itemContent(activeItem)}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}