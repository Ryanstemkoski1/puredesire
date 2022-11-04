import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { Divider } from '../../components/atoms';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function LibraryData() {

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
            <Grid item xs={12} lg={3} sx={{ position: "sticky", top: "0" }}>
              <span style={{ fontSize: "14px", cursor: "pointer", color: "#000", fontWeight: "500" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="7.27" height="12.335" viewBox="0 0 7.27 12.335" style={{ marginRight: "10px" }}>
                  <path id="Path_170" data-name="Path 170" d="M6.162,0,0,6.168l6.168,6.168,1.1-1.1L2.206,6.168,7.27,1.1Z" transform="translate(0)" fill="#1a9182" />
                </svg>
                Back
              </span>
              <Typography
                sx={{
                  fontSize: { sm: '32px', xs: '24px' },
                  color: "#4C4C4C",
                  lineHeight: 1,
                  fontWeight: 500
                }} >Lorem ipsum dolor sit amet consetetur</Typography>

              <Box sx={{ marginTop: "60px", background: "#EFEFEF", borderRadius: "9px" }}>
                <Box>
                  <Grid container
                    spacing={3}
                    direction="row"
                    alignItems="flex-start"
                    sx={{ padding: "15px 0", margin: "0" }}
                  >
                    <Grid item xs={1} >
                      <CheckCircleIcon style={{ width: "15px" }} />
                    </Grid>
                    <Grid item xs={10} sx={{ opacity: "0.5" }} >
                      <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#4C4C4C" }}>Section 1</Typography>
                      <Typography sx={{ fontSize: "15px", color: "#4C4C4C" }}>About the course.</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ overflow: "hidden" }}>
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
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={9}>

            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}