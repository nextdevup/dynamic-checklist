import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const ChecklistToggle = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (props.show) {
      const hasSelectedTag = props.show.filter(elem => props.selectedTags.includes(elem)).length > 0;
      
      if (hasSelectedTag !== checked) {
        setChecked(hasSelectedTag);
      }
    }
  }, [props.show, props.selectedTags]);

  return (
    <div style={{textAlign: 'left'}}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => {
                setChecked(e.target.checked);
                props.checkedHandler(e, props.show);
              }
            }            
            key={props.index}
          />
        }
        label={props.label}
        key={props.index + "label"}
      />
      {props.tooltipText && (
        <Tooltip title={props.tooltipText} key={props.index + "Tooltip"}>
          <InfoIcon fontSize="small" key={props.index + "infoIcon"} />
        </Tooltip>
      )}
    </div>
  );
};

export default ChecklistToggle;