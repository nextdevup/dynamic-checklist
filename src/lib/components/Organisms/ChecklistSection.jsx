import { Grid, Paper } from "@mui/material";
import React from "react";
import ChecklistToggle from "../Molecules/ChecklistToggle";

const ChecklistSection = (props) => {
  return (
    <Paper className="main-content" elevation={10}>
      <h1>{props.Title}</h1>
      <Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
        {props.Options.map((option, index) => (
          <Grid item xs={3}>
            <ChecklistToggle {...option} index={index} key={index + "toggle"} checkedHandler={props.checkedHandler} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ChecklistSection;