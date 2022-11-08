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
          sx={{ marginTop: "100px", paddingLeft: { lg: "30px" } }}
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
          <Grid container
            spacing={3}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            className="userToolbar">
            <Grid item xs={12} lg={3} sx={{ position: { lg: "sticky" }, top: "100px" }}>
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

              <Box sx={{ marginTop: "60px", background: "#EFEFEF", borderRadius: "9px", padding: "15px 0" }}>
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
                {/* <Box sx={{ overflow: "hidden" }}>
                  <Grid container
                    spacing={3}
                    direction="row"
                    sx={{ padding: "15px 0", background: "#E3E3E3", margin: "0" }}
                    alignItems="flex-start">
                    <Grid item xs={1} >
                      <CheckCircleIcon style={{ width: "15px" }} />
                    </Grid>
                    <Grid item xs={10} >
                      <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#4C4C4C" }}>Section 1</Typography>
                      <Typography sx={{ fontSize: "15px", color: "#4C4C4C" }}>About the course.</Typography>
                    </Grid>
                  </Grid>
                  <Grid container
                    spacing={3}
                    direction="row"
                    sx={{ padding: "15px 0", margin: "0" }}
                    alignItems="flex-start">
                    <Grid item xs={1} >
                    </Grid>
                    <Grid item xs={10} >
                      <Grid container
                        spacing={3}
                        direction="row"
                        sx={{ margin: "0" }}
                        alignItems="flex-start">
                        <Grid item xs={1} >
                          <CheckCircleIcon style={{ width: "15px" }} />
                        </Grid>
                        <Grid item xs={10} >
                          <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#4C4C4C" }}>Section 1</Typography>
                          <Typography sx={{ fontSize: "15px", color: "#4C4C4C" }}>About the course.</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container
                    spacing={3}
                    direction="row"
                    sx={{ padding: "15px 0", margin: "0", background: "transparent linear-gradient(103deg, #1C998C 0%, #36505B 100%) 0% 0% no-repeat padding-box" }}
                    alignItems="flex-start">
                    <Grid item xs={1} >
                    </Grid>
                    <Grid item xs={10} >
                      <Grid container
                        spacing={3}
                        direction="row"
                        sx={{ margin: "0" }}
                        alignItems="flex-start">
                        <Grid item xs={1} >
                          <RadioButtonUncheckedIcon style={{ width: "15px", fill: "#fff" }} />
                        </Grid>
                        <Grid item xs={10} >
                          <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#4C4C4C" }}>Section 1</Typography>
                          <Typography sx={{ fontSize: "15px", color: "#4C4C4C" }}>About the course.</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container
                    spacing={3}
                    direction="row"
                    sx={{ padding: "15px 0", margin: "0" }}
                    alignItems="flex-start">
                    <Grid item xs={1} >
                    </Grid>
                    <Grid item xs={10} >
                      <Grid container
                        spacing={3}
                        direction="row"
                        sx={{ margin: "0" }}
                        alignItems="flex-start">
                        <Grid item xs={1} >
                          <RadioButtonUncheckedIcon style={{ width: "15px" }} />
                        </Grid>
                        <Grid item xs={10} >
                          <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#4C4C4C" }}>Section 1</Typography>
                          <Typography sx={{ fontSize: "15px", color: "#4C4C4C" }}>About the course.</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box> */}
              </Box>
            </Grid>
            <Grid item xs={12} lg={9}>
              {itemContent(activeItem)}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}