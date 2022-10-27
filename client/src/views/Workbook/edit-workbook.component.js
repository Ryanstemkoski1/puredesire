
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Divider } from "../../components/atoms";
import { Paper, Typography } from "@mui/material";
import { CreateItems, CreateSection } from "../../components/organisms/CreateWorkbook";

const EditWorkbook = () => {
    const params = useParams();

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <div className="workbookForm" align="left" style={{ minHeight: '55vh' }}>
                <Typography color="primary.neutral" component="h1" variant="h1" sx={{ mb: 2 }}>
                    Create New Workbook
                </Typography>
                <Divider />
                <label className="label">Content</label>
                <CreateItems workBookId={params.id} />
                <CreateSection workBookId={params.id} />
            </div>
        </Paper>
    )
};

export default EditWorkbook;
