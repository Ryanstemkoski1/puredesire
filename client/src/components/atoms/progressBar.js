import ImageOutlined from "@mui/icons-material/ImageOutlined";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import './styles.css';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function ProgressBar({ file, uploading, progress, removeMedia }) {
  return (
    <Grid container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={uploading ? { opacity: "0.7" } : { opacity: "1" }}
      className="progressbar-wrapper">

      {!!file.length && file[0].type === "application/pdf" ? (
        <PictureAsPdfIcon />
      ) : !!file.length && (
        <ImageOutlined />
      )}
      <div style={{ width: "80%" }}>
        {!!file.length && (
          <Typography
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "rgba(0, 0, 0, 0.6)",
              letterSpacing: "-1px",
              textAlign: "left"
            }}
          >
            {file[0].path}
          </Typography>
        )}
        {uploading && (
          <LinearProgress variant="determinate" value={progress} />
        )}
      </div>
      {!!file.length && (
        <Button onClick={() => removeMedia(file[0].path)}>
          <AddIcon style={{ transform: "rotate(45deg)", cursor: "pointer" }} />
        </Button>
      )}
    </Grid>
  )
}