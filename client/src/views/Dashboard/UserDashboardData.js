import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, Legend, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area, Bar, BarChart } from 'recharts';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Chart.css';
import Title from "./Title";
import workbookPlaceholder from "../../images/workbook-placeholder.png";
import blogPlaceholder from "../../images/blog-placeholder.png";
import Button from '@mui/material/Button';
import './UserDashboard.css';
import Link from "@mui/material/Link";
import LaunchIcon from '@mui/icons-material/Launch';
import CircleIcon from '@mui/icons-material/Circle';
import NewsList from "./news-list.component";

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

export default function DashboardData() {
    const theme = useTheme();

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
                <Grid item xs={12} sm={4}>
                    <img src={workbookPlaceholder} alt="" style={{ marginBottom: '10px' }} />
                    <span className="small gray block">
                        <strong>Workbook</strong>
                    </span>
                    <div className="flexWrap">
                        <Typography variant="h3">Betrayal & Beyond Workbook</Typography>
                        <Link className="button-link">
                            Continue
                        </Link>
                    </div>
                    <div className="progressWrap">
                        <LinearProgressWithLabel variant="determinate" value={50} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <img src={workbookPlaceholder} alt="" style={{ marginBottom: '10px' }} />
                    <span className="small gray block">
                        <strong>eBook</strong>
                    </span>
                    <div className="flexWrap">
                        <Typography variant="h3">Betrayal & Beyond Workbook</Typography>
                        <Link className="button-link outline">
                            Start Now
                        </Link>
                    </div>
                    <div className="progressWrap">
                        <LinearProgressWithLabel variant="determinate" value={0} />
                    </div>
                </Grid>
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
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    textAlign: 'left',
                }}

                className="purchaseRecs"
            >
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="h2">Based on your purchase history, you might like these.</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                                <Link>Don’t Show This Again x</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



                <Grid container spacing={0}>
                    <Grid item xs={12} md={4}>
                        <div className="recItem">
                            <div className="recImg">
                                <img src={workbookPlaceholder} alt="" />
                            </div>
                            <div className="recDescri">
                                <span className="small gray block">
                                    <strong>Video Course</strong>
                                </span>
                                <Typography variant="h3">Betrayal & Beyond Workbook</Typography>
                                <Link className="button-link outline">
                                    Check It Out <LaunchIcon />
                                </Link>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className="recItem">
                            <div className="recImg">
                                <img src={workbookPlaceholder} alt="" />
                            </div>
                            <div className="recDescri">
                                <span className="small gray block">
                                    <strong>Video Course</strong>
                                </span>
                                <Typography variant="h3">Betrayal & Beyond Workbook</Typography>
                                <Link className="button-link outline">
                                    Check It Out <LaunchIcon />
                                </Link>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className="recItem">
                            <div className="recImg">
                                <img src={workbookPlaceholder} alt="" />
                            </div>
                            <div className="recDescri">
                                <span className="small gray block">
                                    <strong>Video Course</strong>
                                </span>
                                <Typography variant="h3">Betrayal & Beyond Workbook</Typography>
                                <Link className="button-link outline">
                                    Check It Out <LaunchIcon />
                                </Link>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Title>Notebooks</Title>
                    <Grid container spacing={0} className="boxShadow" sx={{ mb: 3, mt: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Seven Pillars of Freedom</Typography>
                            <span className="small gray block">
                                <strong>Last updated Jun 2</strong>
                            </span>
                        </Grid>

                        <Grid item xs={12} md={6} className="flexWrap">
                            <Link className="button-link">
                                Add New Entry
                            </Link>
                            <Link className="button-link outline" sx={{ ml: 2 }}>
                                View Entries
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} className="boxShadow" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Seven Pillars of Freedom</Typography>
                            <span className="small gray block">
                                <strong>Last updated Jun 2</strong>
                            </span>
                        </Grid>

                        <Grid item xs={12} md={6} className="flexWrap">
                            <Link className="button-link">
                                Add New Entry
                            </Link>
                            <Link className="button-link outline" sx={{ ml: 2 }}>
                                View Entries
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} className="boxShadow" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Seven Pillars of Freedom</Typography>
                            <span className="small gray block">
                                <strong>Last updated Jun 2</strong>
                            </span>
                        </Grid>

                        <Grid item xs={12} md={6} className="flexWrap">
                            <Link className="button-link">
                                Add New Entry
                            </Link>
                            <Link className="button-link outline" sx={{ ml: 2 }}>
                                View Entries
                            </Link>
                        </Grid>
                    </Grid>


                    <Grid container spacing={0} sx={{ mb: 3 }}>
                        <Grid item xs={12}>
                            <Link className="button-link outline full">
                                View All Notebooks
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Title>Assessments</Title>
                    <Grid container spacing={0} className="boxShadow" sx={{ mb: 3, mt: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Seven Pillars of Freedom</Typography>
                            <span className="small gray block">
                                <strong>Last updated Jun 2</strong>
                            </span>
                        </Grid>

                        <Grid item xs={12} md={6} className="flexWrap">
                            <Link className="button-link">
                                Add New Entry
                            </Link>
                            <Link className="button-link outline" sx={{ ml: 2 }}>
                                View Entries
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} className="boxShadow" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Seven Pillars of Freedom</Typography>
                            <span className="small gray block">
                                <strong>Last updated Jun 2</strong>
                            </span>
                        </Grid>

                        <Grid item xs={12} md={6} className="flexWrap">
                            <Link className="button-link">
                                Add New Entry
                            </Link>
                            <Link className="button-link outline" sx={{ ml: 2 }}>
                                View Entries
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} className="boxShadow" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Seven Pillars of Freedom</Typography>
                            <span className="small gray block">
                                <strong>Last updated Jun 2</strong>
                            </span>
                        </Grid>

                        <Grid item xs={12} md={6} className="flexWrap">
                            <Link className="button-link">
                                Add New Entry
                            </Link>
                            <Link className="button-link outline" sx={{ ml: 2 }}>
                                View Entries
                            </Link>
                        </Grid>
                    </Grid>


                    <Grid container spacing={0} sx={{ mb: 3 }}>
                        <Grid item xs={12}>
                            <Link className="button-link outline full">
                                View All Assessments
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <NewsList />
        </Paper>
    );
}