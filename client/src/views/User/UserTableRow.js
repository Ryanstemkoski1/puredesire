import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import './Users.css';

const UserTableRow = (props) => {
    const { _id, name, email, password, role } = props.obj;

    // const deleteUser = () => {
    //     axios
    //         .delete(
    //             process.env.REACT_APP_API_URL + "/user/delete-user/" + _id)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 alert("User successfully deleted");
    //                 window.location.reload();
    //             } else Promise.reject();
    //         })
    //         .catch((err) => alert("Something went wrong"));
    // };

    return (
        <TableRow key={_id}>
            <TableCell><span className="userName">{name}</span></TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{role}</TableCell>
            <TableCell align="right">
                <Link className="button-link"
                             to={"/user/edit-user/" + _id}>
                    Edit
                </Link>
            </TableCell>
        </TableRow>
    );
};

export default UserTableRow;
