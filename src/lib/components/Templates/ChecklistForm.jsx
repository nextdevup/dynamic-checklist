import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChecklistToggle from "../Molecules/ChecklistToggle";

const ChecklistForm = (props) => {
  // If a checkbox doesn't have any tags, then it is not dependent on anything to be displayed
  const [data, setData] = useState([props.ChecklistData.find(checkbox => !checkbox.tags)]);
  const allTags = props.ChecklistData.map(checkbox => checkbox.tags).filter(tag => tag);

  const onAutocompleteChange = (event, values, reason) => {
    onChange(reason == 'selectOption', values);
  }

  const checkedHandler = (event, tagsToToggle,) => {
    onChange(event.target.checked, tagsToToggle);
  }

  const onChange = (isChecked, tagsToToggle) => {
    let checkboxesToDisplay = [...data];

    if (isChecked && tagsToToggle) {
      let checkboxesToAdd = props.ChecklistData.filter(checkbox => checkbox.tags && checkbox.tags.some(tag => tagsToToggle.includes(tag)));

      if (checkboxesToAdd) {
        checkboxesToDisplay.push(...checkboxesToAdd);
      }
    } else if (tagsToToggle) {
      // Display sections that weren't toggled
      checkboxesToDisplay = checkboxesToDisplay.filter(checkbox => !checkbox.tags || !checkbox.tags.some(tag => tagsToToggle.includes(tag)));

      // Display sections that are either the initial section or that still have their triggering section displaying
      checkboxesToDisplay = checkboxesToDisplay.filter(checkbox => !checkbox.tags || checkbox.tags.some(tag => tagsToToggle.includes(tag)));
    }

    setData(checkboxesToDisplay);
  }

  const getSelectedTags = () => {
    return data.filter(checkbox => checkbox.tags).map(checkbox => checkbox.tags);
  }

  return (
    <>
      <Container sx={{marginTop: '1%'}}>
        <Autocomplete 
          multiple
          filterSelectedOptions
          value={[getSelectedTags()]?.length > 0 ? getSelectedTags() : []}
          options={allTags}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" />}
          onChange={onAutocompleteChange}
          id='tags-autocomplete' 
          sx={{width: '50%', margin: 'auto'}}
        />
        {data &&
          <Paper className="main-content" elevation={10} sx={{marginTop: '3%', minHeight: '30vh'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
              {data.map((option, index) => (
                <Grid item xs={3}>
                  <ChecklistToggle {...option} index={index} key={index + "toggle"} checkedHandler={checkedHandler} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        }
      </Container>
    </>
  );
};

export default ChecklistForm;
