import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const WorkbookTableRow = ({ workbook }) => {

    return (
        <TableRow>
            {/* <TableCell align="center">{workbook.title}</TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">{role}</TableCell>
            <TableCell align="right">
                <Link className="button-link"
                    to={"/workbook/edit-workbook/" + _id}>
                    Edit
                </Link> */}
            {/*<Button onClick={deleteWorkbook}*/}
            {/*        size="sm" variant="danger">*/}
            {/*    Delete*/}
            {/*</Button>*/}
            {/* </TableCell> */}
        </TableRow >
    );
};

export default WorkbookTableRow;
