import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import './UserCredits.css';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

export default function CreditsData() {
    const theme = useTheme();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <React.Fragment>
                        <Title>Credits</Title>
                    </React.Fragment>

                    <Grid container spacing={5} sx={{mb:3, mt:1}} className="userCredits">
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={0} className="boxShadow alignCenter">
                                <Grid item xs={12} md={8} sx={{textAlign:'left'}}>
                                    <span className="small gray block">
                                        <strong sx={{fontWeight:500}}>eBook</strong>
                                    </span>
                                    <Typography variant="h3">Behind the Mask</Typography>
                                    <span className="small gray block">
                                        <strong>Expires Jun 12</strong>
                                    </span>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Link className="button-link" sx={{display:'block',mb:1}}>
                                        Use
                                    </Link>
                                    <Link className="button-link outline" sx={{display:'block'}}>
                                        Transfer
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={0} className="boxShadow alignCenter">
                                <Grid item xs={12} md={8} sx={{textAlign:'left'}}>
                                    <span className="small gray block">
                                        <strong sx={{fontWeight:500}}>eBook</strong>
                                    </span>
                                    <Typography variant="h3">Behind the Mask</Typography>
                                    <span className="small gray block">
                                        <strong>Expires Jun 12</strong>
                                    </span>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Link className="button-link" sx={{display:'block',mb:1}}>
                                        Use
                                    </Link>
                                    <Link className="button-link outline" sx={{display:'block'}}>
                                        Transfer
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={0} className="boxShadow alignCenter">
                                <Grid item xs={12} md={8} sx={{textAlign:'left'}}>
                                    <span className="small gray block">
                                        <strong sx={{fontWeight:500}}>eBook</strong>
                                    </span>
                                    <Typography variant="h3">Behind the Mask</Typography>
                                    <span className="small gray block">
                                        <strong>Expires Jun 12</strong>
                                    </span>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Link className="button-link" sx={{display:'block',mb:1}}>
                                        Use
                                    </Link>
                                    <Link className="button-link outline" sx={{display:'block'}}>
                                        Transfer
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={0} className="boxShadow alignCenter">
                                <Grid item xs={12} md={8} sx={{textAlign:'left'}}>
                                    <span className="small gray block">
                                        <strong sx={{fontWeight:500}}>eBook</strong>
                                    </span>
                                    <Typography variant="h3">Behind the Mask</Typography>
                                    <span className="small gray block">
                                        <strong>Expires Jun 12</strong>
                                    </span>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Link className="button-link" sx={{display:'block',mb:1}}>
                                        Use
                                    </Link>
                                    <Link className="button-link outline" sx={{display:'block'}}>
                                        Transfer
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={0} className="boxShadow alignCenter">
                                <Grid item xs={12} md={8} sx={{textAlign:'left'}}>
                                    <span className="small gray block">
                                        <strong sx={{fontWeight:500}}>eBook</strong>
                                    </span>
                                    <Typography variant="h3">Behind the Mask</Typography>
                                    <span className="small gray block">
                                        <strong>Expires Jun 12</strong>
                                    </span>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Link className="button-link" sx={{display:'block',mb:1}}>
                                        Use
                                    </Link>
                                    <Link className="button-link outline" sx={{display:'block'}}>
                                        Transfer
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={0} className="boxShadow alignCenter">
                                <Grid item xs={12} md={8} sx={{textAlign:'left'}}>
                                    <span className="small gray block">
                                        <strong sx={{fontWeight:500}}>eBook</strong>
                                    </span>
                                    <Typography variant="h3">Behind the Mask</Typography>
                                    <span className="small gray block">
                                        <strong>Expires Jun 12</strong>
                                    </span>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Link className="button-link" sx={{display:'block',mb:1}}>
                                        Use
                                    </Link>
                                    <Link className="button-link outline" sx={{display:'block'}}>
                                        Transfer
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}