import React, {useState} from "react";
import {useTranslation} from "react-i18next";
// import {Fade, Modal, Grid, Button} from "@material-ui/core";
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

import {ChromePicker} from "react-color";

import {makeStyles} from "@mui/material/styles";
const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    modalContent: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[7],
        minHeight: 400,
        margin: 10,
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    }
}));

export const ColorPicker = ({label, onChange, currentColor}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const [color, setColor] = useState(currentColor || "#333");
    const [showPicker, setShowPicker] = useState(false);
    const handleChange = color => {
        setColor(color.hex);
    };

    return (
        <div
            style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: 10}}>
            <label>{label}</label>
            <div
                style={{
                    marginLeft: 20,
                    padding: 15,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 3,
                    backgroundColor: color
                }}
                onClick={() => setShowPicker(true)}></div>
            {showPicker && (
                <Modal
                    className={classes.modal}
                    open={showPicker}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 500
                    }}>
                    <Fade in={true}>
                        <div className={classes.modalContent}>
                            <label>{label}</label>
                            <div
                                style={{
                                    backgroundColor: color,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    padding: 40,
                                    borderRadius: 3
                                }}>
                                <ChromePicker color={color} onChange={handleChange} />
                            </div>
                            <Grid container spacing={10} justify="space-evenly">
                                <Grid item xs={12} md={6} align="center">
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            setShowPicker(false);
                                        }}>
                                        {t("ACTIONS.CANCEL")}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6} align="center">
                                    <Button
                                        color="inherit"
                                        type="submit"
                                        onClick={() => {
                                            onChange(color);
                                            setShowPicker(false);
                                        }}>
                                        {t("ACTIONS.SAVE")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
            )}
        </div>
    );
};