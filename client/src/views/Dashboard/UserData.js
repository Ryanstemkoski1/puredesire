import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

export default function GroupsData() {
    const theme = useTheme();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <React.Fragment>
                        <Title>Users</Title>
                    </React.Fragment>
                </Paper>
            </Grid>
        </Grid>
    );
}