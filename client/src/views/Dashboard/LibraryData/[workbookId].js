import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControl, FormControlLabel, Grid, Link, Paper, Radio, RadioGroup, Skeleton, TextField, Typography } from "@mui/material";
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query";
import axios from "axios"
import Slider from '@mui/material/Slider';
import { LeftNav } from "../../../components/molecules/clientWorbook";

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
      setActiveItem(workbookItems[1])
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
          sx={{ marginTop: "100px", paddingLeft: "30px", textAlign: "left" }}
        >
          <Typography
            sx={{
              fontSize: { sm: '32px', xs: '24px' },
              color: "#4C4C4C",
              lineHeight: 1,
              fontWeight: 500
            }} >{item.title}</Typography>
          <Box>
            {!!item.questions && item.questions.filter((question) => {
              if (question.type === "content") {
                return question
              }
            }).map((question) => {
              return (
                <Box
                  key={question._id}
                  sx={{
                    color: "#4C4C4C",
                    marginTop: "30px"
                  }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: question.title }}>
                  </div>
                </Box>
              )
            })}
            
            {!!item.questions && item.questions.map((question, i) => {
              if (question.type === "text") {
                return (
                  <Box
                    key={question._id}
                    sx={{
                      color: "#4C4C4C",
                      marginTop: "30px"
                    }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>{i + 1} . {question.title}</Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      placeholder="Type here..."
                    />
                  </Box>
                )
              } else if (question.type === "textarea") {
                return (
                  <Box
                    key={question._id}
                    sx={{
                      color: "#4C4C4C",
                      marginTop: "30px"
                    }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>{i + 1} . {question.title}</Typography>
                    <TextField
                      margin="normal"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Type here..."
                    />
                  </Box>
                )
              } else if (question.type === "rating") {
                return (
                  <Box
                    key={question._id}
                    sx={{
                      color: "#4C4C4C",
                      marginTop: "30px",
                      maxWidth: "400px"
                    }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>{i + 1} . {question.title}</Typography>
                    <Slider
                      aria-label="Raging"
                      defaultValue={3}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={1}
                      max={12}
                    />
                  </Box>
                )
              } else if (question.type === "radio") {
                return (
                  <Box
                    key={question._id}
                    sx={{
                      color: "#4C4C4C",
                      marginTop: "30px"
                    }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>{i + 1} . {question.title}</Typography>
                    <FormControl sx={{ mt: 1 }} >
                      <RadioGroup
                        aria-labelledby="assessment-radio-buttons-group-label"
                        name="assessment-radio-buttons-group">
                        {!!question.options && question.options.map((option, index) => (
                          <FormControlLabel
                            control={
                              <Radio name={option.title} />
                            }
                            label={option.title}
                            value={option.title}
                            key={option._id}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )
              } else if (question.type === "checkbox") {
                return (
                  <Box
                    key={question._id}
                    sx={{
                      color: "#4C4C4C",
                      marginTop: "30px"
                    }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>{i + 1} . {question.title}</Typography>
                    <FormControl sx={{ mt: 1 }} component="fieldset" variant="standard">
                      {!!question.options && question.options.map((option, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox name="gilad" />
                          }
                          label={option.title}
                          key={option._id}
                        />
                      ))}
                    </FormControl>
                  </Box>
                )
              }
            })}
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
                  <LeftNav key={section._id} section={section} index={i} workbookItems={workbookItems} changeItemContent={(item) => setActiveItem(item)} />
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