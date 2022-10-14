import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTableRow from "./UserTableRow";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Title from "../Dashboard/Title";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import {signOut} from "../../utils/cognitoAuth";
import Table from '@mui/material/Table';


function preventDefault(event) {
    event.preventDefault();
}

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + "/user/")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return users.map((res, i) => {
            return <UserTableRow obj={res} key={i} />;
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
                            <Title>Users</Title>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            search goes here
                        </Grid>

                        <Grid item xs={12} sm="auto">
                            filter goes here
                        </Grid>

                        <Grid item xs={12} sm="auto" sx={{marginBottom: {xs:4, sm:0}}}>
                            <Link href="/user/create-user" className="button-link">Add New User</Link>
                        </Grid>
                    </Grid>

                    <div className="tableWrap">
                        <Table size="small" className="userTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {DataTable()}
                            </TableBody>
                        </Table>
                    </div>
                    {/*<Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>*/}
                    {/*    See more users*/}
                    {/*</Link>*/}
                </React.Fragment>
            </Paper>
        </Grid>
    );
};

export default UserList;
