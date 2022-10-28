import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import WorkbookTableRow from "./WorkbookTableRow";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Title from "../Dashboard/Title";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useQuery } from "react-query";

const WorkbookList = () => {
    const workBookQuery = useQuery("workbook", () => axios.get(process.env.REACT_APP_API_URL + "/workbook/").then(res => res.data))
    const workbooks = workBookQuery.data || []

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Grid container
                    spacing={3}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="userToolbar">
                    <Grid item xs={12} lg={6}>
                        <Title>Digital Library</Title>
                    </Grid>
                    <Grid item xs={12} md="auto">
                        search goes here
                    </Grid>

                    <Grid item xs={12} md="auto">
                        filter goes here
                    </Grid>

                    <Grid item xs={12} lg="auto">
                        <Link to="/workbook/create-workbook" className="button-link">Create New Workbook</Link>
                    </Grid>
                </Grid>
                <div>
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="accordionToggle"
                        >

                            <div className="accordionImage">
                                <img src="https://placehold.jp/98x98.png"></img>
                            </div>

                            <h2 className="accordionTitle"><ExpandMoreIcon /> Betrayal & Beyond Workbook</h2>

                            <div className="accordionBtns">
                                <Link href="#" className="button-link outline" style={{ marginRight: '10px' }} onClick={(e) => { e.stopPropagation(); }}>Duplicate</Link>
                                <Link href="#" className="button-link outline red" onClick={(e) => { e.stopPropagation(); }}>Disable</Link>
                            </div>

                        </AccordionSummary>

                        <AccordionDetails sx={{ pb: 2, pl: 8 }} style={{ borderTop: '1px solid #e0e0e0' }} className="accordionDetails">
                            <h3 className="accordionTitle" align="left">
                                <SubdirectoryArrowRightIcon /> Betrayal & Beyond Workbook
                            </h3>

                            <div className="accordionStats">
                                <span>Enrolled <strong>90</strong></span>
                                <span>Completed <strong>90</strong></span>
                                <span>Unused Credits <strong>90</strong></span>
                            </div>

                            <div className="accordionBtns">
                                <Link href="#" className="button-link" style={{ marginRight: '10px' }} onClick={(e) => { e.stopPropagation(); }}>Edit</Link>
                                <Link href="#" className="button-link outline red" onClick={(e) => { e.stopPropagation(); }}>Disable</Link>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ pb: 2, pl: 8 }} style={{ borderTop: '1px solid #e0e0e0' }} className="accordionDetails">
                            <h3 className="accordionTitle" align="left">
                                <SubdirectoryArrowRightIcon /> Libro de trabajo Traición y más allá
                            </h3>

                            <div className="accordionStats">
                                <span>Enrolled <strong>90</strong></span>
                                <span>Completed <strong>90</strong></span>
                                <span>Unused Credits <strong>90</strong></span>
                            </div>

                            <div className="accordionBtns">
                                <Link href="#" className="button-link" style={{ marginRight: '10px' }} onClick={(e) => { e.stopPropagation(); }}>Edit</Link>
                                <Link href="#" className="button-link outline red" onClick={(e) => { e.stopPropagation(); }}>Disable</Link>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            className="accordionToggle single"
                        >

                            <div className="accordionImage">
                                <img src="https://placehold.jp/98x98.png"></img>
                            </div>

                            <h2 className="accordionTitle">Betrayal & Beyond Workbook</h2>

                            <div className="accordionStats">
                                <span>Enrolled <strong>90</strong></span>
                                <span>Completed <strong>90</strong></span>
                                <span>Unused Credits <strong>90</strong></span>
                            </div>

                            <div className="accordionBtns">
                                <Link href="#" className="button-link outline" style={{ marginRight: '10px' }} onClick={(e) => { e.stopPropagation(); }}>Duplicate</Link>
                                <Link href="#" className="button-link outline red" onClick={(e) => { e.stopPropagation(); }}>Disable</Link>
                            </div>

                        </AccordionSummary>
                    </Accordion>

                    {!!workbooks.length && workbooks.map((workbook, i) =>
                        <Accordion key={workbook._id}>
                            <AccordionSummary
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                className="accordionToggle single"
                            >
                                <div className="accordionImage">
                                    {workbook.file_header ? (
                                        <img
                                            src={process.env.REACT_APP_API_URL + "/" + workbook.file_header}
                                            style={{
                                                width: "100%",
                                                objectFit: "cover",
                                                height: "auto"
                                            }}
                                        />
                                    ) : (
                                        <img src="https://placehold.jp/98x98.png" />
                                    )}
                                </div>
                                <h2 className="accordionTitle">{workbook.title}</h2>
                                <div className="accordionStats">
                                    <span>Enrolled <strong>0</strong></span>
                                    <span>Completed <strong>0</strong></span>
                                    <span>Unused Credits <strong>0</strong></span>
                                </div>
                                <div className="accordionBtns">
                                    <Link className="button-link" style={{ marginRight: '10px' }} to={"/workbook/edit-workbook/" + workbook._id}>
                                        Edit
                                    </Link>
                                    <Link href="#" className="button-link outline red" onClick={(e) => { e.stopPropagation(); }}>Disable</Link>
                                </div>
                            </AccordionSummary>
                        </Accordion>
                    )}
                </div>
            </Paper>
        </Grid>
    );
};

export default WorkbookList;
