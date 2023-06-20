import React, { useState } from "react";
import ChecklistSection from "../Organisms/ChecklistSection";

const ChecklistForm = (props) => {
  const [data, setData] = useState([props.ChecklistData.find(section => section.SectionName === props.initialSectionName)]);

  const checkedHandler = (event, sectionToToggle) => {
    let sectionsToDisplay = [...data];

    if (event.target.checked && sectionToToggle) {
      let sectionToAdd = props.ChecklistData.find(section => section.SectionName === sectionToToggle);

      if (sectionToAdd) {
        sectionsToDisplay.push(sectionToAdd);
      }
    } else {
      // Display sections that weren't toggled
      sectionsToDisplay = sectionsToDisplay.filter(section => section.SectionName !== sectionToToggle);

      // Display sections that are either the initial section or that still have their triggering section displaying
      sectionsToDisplay = sectionsToDisplay.filter(section => section.SectionName === props.initialSectionName || 
          sectionsToDisplay.some(function(sectionToCheckVisible) { 
            return sectionToCheckVisible.Options.some(function(option) { 
              return (option.SectionNameToDisplay && option.SectionNameToDisplay === section.SectionName)
            }) 
          })
        );
    }

    setData(sectionsToDisplay);
  }

  return (
    <div>
      {data.map((section) => (
        section && <ChecklistSection 
        key={section.SectionName}
        {...section}
        checkedHandler={checkedHandler}
      />
      ))}
    </div>
  );
};

export default ChecklistForm;
