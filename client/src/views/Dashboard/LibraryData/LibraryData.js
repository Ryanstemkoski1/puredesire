import * as React from 'react';
import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import Title from '../Title';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import workbookPlaceholder from "../../../images/workbook-placeholder.png";
import { useQuery } from 'react-query';
import axios from 'axios';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary" style={{ fontWeight: '600', fontSize: '14px', color: '#1A9182' }}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LibraryData() {

  const workBooksQuery = useQuery("workbook", () => axios.get(process.env.REACT_APP_API_URL + "/workbook/").then(res => res.data))
  const workbooks = workBooksQuery.data || []

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        textAlign: 'left'
      }}
    >
      <Grid container
        spacing={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="userToolbar"
        flexWrap="nowrap">
        <Grid item xs={12} sm={9}>
          <Title>Library</Title>
        </Grid>

        <Grid item xs={12} sm="auto">
          filter goes here
        </Grid>
      </Grid>
      <Grid container spacing={7} className="workbookDashboard" sx={{ mt: 1 }}>
        {!!workbooks.length && workbooks.map((item, i) => (
          <Grid item xs={12} sm={6} lg={4} key={item._id}>
            <img src={item.file_cover ? process.env.REACT_APP_API_URL + "/" + item.file_cover : workbookPlaceholder} alt="" style={{ maxWidth: "200px", marginBottom: '10px', minHeight: "300px", objectFit: "contain" }} />
            <span className="small gray block">
              <strong>Workbook</strong>
            </span>
            <div className="flexWrap">
              <Typography variant="h3">{item.title}</Typography>
              <Link className="button-link" href={"/library/" + item._id} >
                Continue
              </Link>
            </div>
            <div className="progressWrap">
              <LinearProgressWithLabel variant="determinate" value={50} />
            </div>
          </Grid>
        ))}
        <Grid item xs={12} sm={4}>
          <img src={workbookPlaceholder} alt="" style={{ marginBottom: '10px' }} />
          <span className="small gray block">
            <strong>Video Course</strong>
          </span>
          <div className="flexWrap">
            <Typography variant="h3">Betrayal & Beyond Workbook</Typography>
            <Link className="button-link outline">
              Restart
            </Link>
          </div>
          <div className="progressWrap">
            <LinearProgressWithLabel variant="determinate" value={100} />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}