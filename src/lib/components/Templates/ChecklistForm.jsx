import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChecklistToggle from "../Molecules/ChecklistToggle";

const ChecklistForm = (props) => {
  // If a checkbox doesn't have any tags, then it is not dependent on anything to be displayed
  const [data, setData] = useState(props.ChecklistData.filter(checkbox => !checkbox?.tags));
  const [selectedTags, setSelectedTags] = useState([]);
  const allTags = [...new Set(props.ChecklistData.flatMap(checkbox => checkbox.tags?.filter(tag => tag !== undefined) ?? []))];

  const onAutocompleteChange = (event, values, reason) => {
    onChange(reason == 'selectOption', values, true, false);    
  }

  const checkedHandler = (event, showProp) => {
    onChange(event.target.checked, showProp, false, true);
  }

  const onChange = (isSelected, tagsToToggle, fromAutoComplete = false, fromCheckbox = false) => {
    let checkboxesToDisplay = [...props.ChecklistData];
    let updatedSelectedTags = [];

    if (fromAutoComplete) {
        updatedSelectedTags = tagsToToggle ?? [];
    } else if (tagsToToggle?.length) {
        if (isSelected) {
            updatedSelectedTags = Array.from(new Set([...selectedTags, ...tagsToToggle])) ?? [];
        } else {
            updatedSelectedTags = selectedTags.filter(tag => !tagsToToggle.includes(tag)) ?? [];
        }
    }
    else {
        return;
    }

    checkboxesToDisplay = checkboxesToDisplay.filter(checkbox => {
      return !checkbox.tags ||
        updatedSelectedTags.some(tag => checkbox.tags.includes(tag))
    });

    // Sort based on tags so that new checkboxes append to the end (otherwise will inject based on data order)
    checkboxesToDisplay.sort((firstCheckbox, secondCheckbox) => {      
      const firstTagIndexes = [...(firstCheckbox.tags?.map(tag => updatedSelectedTags.indexOf(tag)) ?? [0])];;
      const secondTagIndexes = [...(secondCheckbox.tags?.map(tag => updatedSelectedTags.indexOf(tag)) ?? [0])];;

      // Remove any -1 values for non-matches to make sure they're not sorted first
      removeNegativeIndexes(firstTagIndexes);
      removeNegativeIndexes(secondTagIndexes);

      // Per docs, return a negative num if you want first elem sorted earlier or positive if second element should sort first
      return Math.min(...firstTagIndexes) - Math.min(...secondTagIndexes);
    });

    setData(checkboxesToDisplay);
    setSelectedTags(updatedSelectedTags);
  }

  const removeNegativeIndexes = (arr) => {
    let negativeIndex = arr.indexOf(-1);

    if (negativeIndex !== -1) {
      arr[negativeIndex] = Infinity;
    }
  }

  return (
    <>
      <Container sx={{marginTop: '1%'}}>
        <Autocomplete 
          multiple
          filterSelectedOptions
          value={selectedTags ?? []}
          options={allTags}
          getOptionLabel={(option) => option ?? ''}
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
                <Grid item xs={3} key={index + "grid"}>
                  <ChecklistToggle {...option} index={index} key={index + "toggle"} checkedHandler={checkedHandler} selectedTags={selectedTags} />
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