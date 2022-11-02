import * as React from 'react';
import Link from '@mui/material/Link';
import Title from './Title';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import './RecentPurchases.css';
import workbookPlaceholder from "../../images/workbook-placeholder.png";
import Typography from '@mui/material/Typography';



function preventDefault(event) {
    event.preventDefault();
}

export default function RecentPurchasesData() {
    return (
        <Grid item xs={12}>
            <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <React.Fragment>
                    <Title>Recent Purchases</Title>
                </React.Fragment>

                <Grid container spacing={5} className="purchasesDashboard" sx={{textAlign:'left', marginTop:'10px'}}>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                </Grid>

                <Grid container spacing={5} className="purchasesDashboard" sx={{textAlign:'left', marginTop:'10px'}}>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                    <Grid item xs={12} lg>
                        <img src={workbookPlaceholder} alt="" style={{marginBottom:'10px'}}/>
                        <span className="small gray block">
                            <strong>Kit</strong>
                        </span>
                        <Typography variant="h3" sx={{marginTop:'4px', marginBottom: '2px'}}>Seven Pillars of Freedom Kit</Typography>
                        <span className="small gray inlineBlock">
                            <strong sx={{fontWeight: '500'}}>June 18, 2022 /</strong>
                        </span>

                        <span className="small green inlineBlock" style={{marginLeft:'5px'}}>
                            <strong>$79.99</strong>
                        </span>
                    </Grid>
                    <Grid item xs={12} lg>
                    </Grid>
                    <Grid item xs={12} lg>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}