import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const ChecklistToggle = (props) => {
  return (
    <div style={{textAlign: 'left'}}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.tagSelected}
            onChange={(e) =>
              props.checkedHandler(e, props.show)
            }            
            key={props.index}
          />
        }
        label={props.label}
        key={props.index + "label"}
      />
      {props.TooltipText && (
        <Tooltip title={props.tooltipText} key={props.index + "Tooltip"}>
          <InfoIcon fontSize="small" key={props.index + "infoIcon"} />
        </Tooltip>
      )}
    </div>
  );
};

export default ChecklistToggle;