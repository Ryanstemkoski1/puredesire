import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, Legend, Tooltip, CartesianGrid,  ResponsiveContainer, AreaChart, Area, Bar, BarChart } from 'recharts';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
// import Box from '@mui/material/Box';
import './Chart.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// function preventDefault(event) {
// 	event.preventDefault();
// }

function getDateString(fullDate){
	const thisDate = new Date(fullDate);
	return thisDate.toDateString();
}

const DashboardData = () => {
	const [dashboard, setDashboard] = useState([]);

	useEffect(() => {
		axios.get(process.env.REACT_APP_API_URL + "/adminDashboard/").then(({data}) => {
			setDashboard(data);
		}).catch((error) => {
			console.log(error);
		});
	}, []);

	const CustomSignupsTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="custom-tooltip">
					<p className="label">Date: {getDateString(payload[0].payload.signupDate)}</p>
					<p className="label">Signups: {payload[0].payload.counter}</p>
				</div>
			);
		}

		return null;
	};

	const balanceData = [
	    {lineOne: 5310.45,lineTwo: 6800.45},
	    {lineOne: 6302.45,lineTwo: 5050.45},
	    {lineOne: 4110.45,lineTwo: 7800.45},
	    {lineOne: 6310.45,lineTwo: 4800.45},
	    {lineOne: 3302.45,lineTwo: 7050.45},
	    {lineOne: 5310.45,lineTwo: 6800.45}
	];


	const visitorData = [
	    {
	        name: 'Page A',
	        uv: 4000,
	        pv: 2400,
	        amt: 2400,
	    },
	    {
	        name: 'Page B',
	        uv: 3000,
	        pv: 1398,
	        amt: 2210,
	    },
	    {
	        name: 'Page C',
	        uv: 2000,
	        pv: 9800,
	        amt: 2290,
	    },
	    {
	        name: 'Page D',
	        uv: 2780,
	        pv: 3908,
	        amt: 2000,
	    },
	    {
	        name: 'Page E',
	        uv: 1890,
	        pv: 4800,
	        amt: 2181,
	    },
	    {
	        name: 'Page F',
	        uv: 2390,
	        pv: 3800,
	        amt: 2500,
	    },
	    {
	        name: 'Page G',
	        uv: 3490,
	        pv: 4300,
	        amt: 2100,
	    },
	];

	return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={3}>
                <div className="chartWrap">
                    <div className="chartTitle">
                        <h2>Total Users</h2>
                    </div>
                    <div className="chartStats">
                        <div className="subTitle">{dashboard.userTotal}</div>
                    </div>

                    <Paper
                        sx={{
                            height: 410,
                            padding: 0,
                            width: '100%',
                            boxSizing: 'border-box',
                            background: 'transparent',
                        }}
                    >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={dashboard.userSignups}
                            margin={{
                                top: 40,
                                right: 20,
                                left: 20,
                                bottom: 50,
                            }}
                        >
	                        <Tooltip content={<CustomSignupsTooltip />} />
	                        <Bar dataKey="counter" stackId="a" fill="#02BC77" barSize={3} />
                        </BarChart>
                    </ResponsiveContainer>
                    </Paper>
                </div>
            </Grid>
            <Grid item xs={12} lg={3}>
                <div className="chartWrap">
                    <div className="chartTitle" style={{borderBottom: '0'}}>
                        <h2>Total Balance</h2>
                        <div className="subTitle">$1,234</div>
                    </div>
                    <Paper
                        sx={{
                            height: 216,
                            padding: 0,
                            width: '100%',
                            boxSizing: 'border-box',
                            background: 'transparent',
                        }}
                    >
                        <React.Fragment>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={balanceData}
                                    margin={{ top: 10,
                                        right: 0,
                                        left: 0,
                                        bottom: 0, }}
                                >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#09b9837a" stopOpacity={0.5}/>
                                            <stop offset="100%" stopColor="#09b9837a" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4791ff66" stopOpacity={0.5}/>
                                            <stop offset="100%" stopColor="#4791ff66" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip></Tooltip>
                                    <Area //first line
                                        type="monotone"
                                        dataKey="lineOne"
                                        stroke="#02BC77"
                                        fill="url(#colorUv)"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 8 }}
                                    />
                                    <Area //second line
                                        type="monotone"
                                        dataKey="lineTwo"
                                        stroke="#4791FF"
                                        fill="url(#colorPv)"
                                        dot={false}
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </React.Fragment>
                    </Paper>
                </div>

                <div className="chartWrap" style={{marginTop:'40px'}}>
                    <div className="chartTitle">
                        <h2>Total Visitors</h2>
                    </div>
                    <Grid container={'true'} item sx={12}>
                        <Grid item xs={12} md={6}>
                            <div className="chartStats">
                                <div className="subTitle">144K</div>
                                <div className="plus">+ 25%</div>
                            </div>
                            </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                sx={{
                                    height: 77,
                                    padding: 0,
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    background: 'transparent',
                                }}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={visitorData}>
                                        <Line type="monotone" dataKey="pv" stroke="#02BC77" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12} lg={6}>
                <div className="chartWrap">
                    <div className="chartTitle">
                        <h2>Most Popular Products</h2>
                    </div>

                    <div className="popularProduct" style={{marginTop:'49px'}}>
                        <div className="productInfo">
                            <label>Betrayal & Beyond Workbook</label>
                            <span>80,451 sales</span>
                        </div>
                        <LinearProgress variant="determinate" value={50} />
                    </div>

                    <div className="popularProduct">
                        <div className="productInfo">
                            <label>Digital Natives Book Study</label>
                            <span>80,451 sales</span>
                        </div>
                        <LinearProgress variant="determinate" value={30} />
                    </div>

                    <div className="popularProduct">
                        <div className="productInfo">
                            <label>Digital Natives Book Study</label>
                            <span>80,451 sales</span>
                        </div>
                        <LinearProgress variant="determinate" value={30} />
                    </div>

                    <div className="popularProduct">
                        <div className="productInfo">
                            <label>Digital Natives Book Study</label>
                            <span>80,451 sales</span>
                        </div>
                        <LinearProgress variant="determinate" value={30} />
                    </div>

                    <div className="popularProduct" style={{marginBottom:'49px'}}>
                        <div className="productInfo">
                            <label>Digital Natives Book Study</label>
                            <span>80,451 sales</span>
                        </div>
                        <LinearProgress variant="determinate" value={30} />
                    </div>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className="chartWrap" style={{marginTop:'30px'}}>
                    <div className="chartTitle">
                        <h2>Most Recent Products</h2>

                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} className="productsTable">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>PRODUCT</TableCell>
                                            <TableCell>ENROLLED</TableCell>
                                            <TableCell>COMPLETED</TableCell>
                                            <TableCell>UNUSED CREDITS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>356121</TableCell>
                                            <TableCell>Living Free Workbook</TableCell>
                                            <TableCell>451</TableCell>
                                            <TableCell>14</TableCell>
                                            <TableCell>20</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>356122</TableCell>
                                            <TableCell>Sexual Integrity 101</TableCell>
                                            <TableCell>507</TableCell>
                                            <TableCell>94</TableCell>
                                            <TableCell>59</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>356632</TableCell>
                                            <TableCell>Digital Natives Book Study</TableCell>
                                            <TableCell>91</TableCell>
                                            <TableCell>23</TableCell>
                                            <TableCell>5</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default DashboardData;