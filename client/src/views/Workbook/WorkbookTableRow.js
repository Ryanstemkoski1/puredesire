import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const WorkbookTableRow = (props) => {
    const { _id, name, email, password, role } = props.obj;

    const deleteWorkbook = () => {
        axios
            .delete(
                process.env.REACT_APP_API_URL + "/workbook/delete-workbook/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Workbook successfully deleted");
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (
        <TableRow key={_id}>
            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">{role}</TableCell>
            <TableCell align="right">
                <Link className="button-link"
                    to={"/workbook/edit-workbook/" + _id}>
                    Edit
                </Link>
                {/*<Button onClick={deleteWorkbook}*/}
                {/*        size="sm" variant="danger">*/}
                {/*    Delete*/}
                {/*</Button>*/}
            </TableCell>
        </TableRow>
        // <tr>
        //     <td>{name}</td>
        //     <td>{email}</td>
        //     <td>{role}</td>
        //     <td>
        //         <Link className="edit-link"
        //               to={"/workbook/edit-workbook/" + _id}>
        //             Edit
        //         </Link>
        //         <Button onClick={deleteWorkbook}
        //                 size="sm" variant="danger">
        //             Delete
        //         </Button>
        //     </td>
        // </tr>
    );
};

export default WorkbookTableRow;
