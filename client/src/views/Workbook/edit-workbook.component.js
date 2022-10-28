
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Divider } from "../../components/atoms";
import { Paper, Typography } from "@mui/material";
import { CreateItems, CreateSection } from "../../components/organisms/CreateWorkbook";
import { useQuery } from "react-query";

export default function EditWorkbook() {
    const urlParams = useParams();
    const workBookQuery = useQuery(["bookSection", urlParams.id], (params) => fetchWorkBook(params.queryKey[1]))

    if (workBookQuery.isLoading || workBookQuery.isError) return null

    const workBook = workBookQuery.data || {}

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <div className="workbookForm" align="left" style={{ minHeight: '55vh' }}>
                <Typography color="primary.neutral" component="h1" variant="h1" sx={{ mb: 2 }}>
                    Create New Workbook
                </Typography>
                <Divider />
                <label className="label">Content</label>
                {workBook.sections && workBook.sections.map((item, i) =>
                    <CreateItems key={item._id} item={item} workBookId={urlParams.id} />
                )}
                <CreateSection workBookId={urlParams.id} workBook={workBook} />
            </div>
        </Paper>
    )
};

const fetchWorkBook = (params) => {
    return axios
        .get(process.env.REACT_APP_API_URL + `/workbook/${params}`)
        .then((response) => response.data)
}
