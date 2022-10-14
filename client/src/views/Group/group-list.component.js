import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import GroupTableRow from "./GroupTableRow";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Title from "../Dashboard/Title";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TableContainer from '@mui/material/TableContainer';

function preventDefault(event) {
    event.preventDefault();
}

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/group/")
            .then(({ data }) => {
                setGroups(data);
                console.log(groups);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return groups.map((res, i) => {
            return <GroupTableRow obj={res} key={i} />;
        });
    };

    // const DataTable = () => {
    //     return users.map((row) => (
    //         <TableRow key={row.id}>
    //             <TableCell>{row.name}</TableCell>
    //             <TableCell>{row.email}</TableCell>
    //             <TableCell>{row.password}</TableCell>
    //             <TableCell>{row.role}</TableCell>
    //         </TableRow>
    //     ))
    // };

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
                    <Grid container
                          spacing={3}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          className="userToolbar"
                          flexWrap="nowrap">
                        <Grid item xs={12} sm={6}>
                            <Title>Groups</Title>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            search goes here
                        </Grid>

                        <Grid item xs={12} sm="auto">
                            filter goes here
                        </Grid>

                        <Grid item xs={12} sm="auto" sx={{marginBottom: {xs:4, sm:0}}}>
                            <Link href="/group/create-group" className="button-link">Add New Group</Link>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table size="small" className="userTable" sx={{ minWidth: 700 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="firstCol">Name</TableCell>
                                    <TableCell>Users</TableCell>
                                    <TableCell>&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow>
                                        <TableCell className="firstCol"><strong>Group Name</strong></TableCell>
                                        <TableCell>218</TableCell>
                                        <TableCell align="right" sx={{paddingRight: 1}}>
                                            <Link className="button-link" sx={{marginRight: 2 }}>
                                                Edit
                                            </Link>

                                            <Link className="button-link outline" sx={{marginRight: 2 }}>
                                                Manage Attendee
                                            </Link>

                                            <Link className="button-link outline red">
                                                Delete
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="firstCol"><strong>Group Name</strong></TableCell>
                                        <TableCell>218</TableCell>
                                        <TableCell align="right" sx={{paddingRight: 1}}>
                                            <Link className="button-link" sx={{marginRight: 2 }}>
                                                Edit
                                            </Link>

                                            <Link className="button-link outline" sx={{marginRight: 2 }}>
                                                Manage Attendee
                                            </Link>

                                            <Link className="button-link outline red">
                                                Delete
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            </Paper>
        </Grid>
    );
};

export default GroupList;
