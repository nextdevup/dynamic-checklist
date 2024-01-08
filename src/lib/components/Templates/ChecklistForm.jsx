import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChecklistToggle from "./ChecklistToggle";

const ChecklistForm = (props) => {
  // If a checkbox doesn't have any tags, then it is not dependent on anything to be displayed
  const [data, setData] = useState([props.ChecklistData.find(checkbox => !checkbox.tags)]);
  const [selectedTags, setSelectedTags] = useState([]);
  const allTags = props.ChecklistData.flatMap(checkbox => checkbox.tags).filter(tag => tag);

  const onAutocompleteChange = (event, values, reason) => {
    onChange(reason == 'selectOption', values, true);    
  }

  const checkedHandler = (event, tagsToToggle,) => {
    onChange(event.target.checked, tagsToToggle);
  }

  const onChange = (isChecked, tagsToToggle, fromAutoComplete = false) => {
    let checkboxesToDisplay = [...props.ChecklistData];
    let updatedSelectedTags = [];
    console.log('isChecked: ' + isChecked + ' tagsToToggle: ' +  tagsToToggle);

    if (fromAutoComplete) {
        updatedSelectedTags = tagsToToggle ?? [];
    } else if (tagsToToggle?.length) {
        if (isChecked) {
            updatedSelectedTags = Array.from(new Set([...selectedTags, ...tagsToToggle])) ?? [];
        } else {
            updatedSelectedTags = selectedTags.filter(tag => !tagsToToggle.includes(tag)) ?? [];
        }
    }
    else {
        return;
    }

    console.log('selectedTags: ' + updatedSelectedTags);

    checkboxesToDisplay = checkboxesToDisplay.filter(checkbox => 
        !checkbox.tags ||
        (updatedSelectedTags.some(tag => 
            checkbox.tags.includes(tag) ||
            checkboxesToDisplay?.some(elem => 
                elem.tags?.includes(tag) && elem.show?.some(show => checkbox.tags?.includes(show))
            )
        ))
    );

    setData(checkboxesToDisplay);
    setSelectedTags(updatedSelectedTags);
  }

  return (
    <>
      <Container sx={{marginTop: '1%'}}>
        <Autocomplete 
          multiple
          filterSelectedOptions
          value={selectedTags ?? []}
          options={allTags}
          // isOptionEqualToValue has to be explicitly defined to compare without type matching
          isOptionEqualToValue={(option, value) => option == value}
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
                  <ChecklistToggle {...option} index={index} key={index + "toggle"} checkedHandler={checkedHandler}
                    tagSelected={option.show && option.show.filter(elem => selectedTags.includes(elem)).length} />
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