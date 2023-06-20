## Simple npm package for building dynamic checklists in React

### Install

Install using `npm install dynamic-checklist`

### Usage 

In a React app, import the ChecklistForm components:  
`import { ChecklistForm } from 'dynamic-checklist'`

Pass in the data for the component (see example below of the data file that can be used)

`import data from "data-file.json";`

The initialSectionName comes from the SectionName property of the data that specifies the first checklist group to display

`<ChecklistForm ChecklistData={data} initialSectionName='Initial' />`

#### Example of data for checklist

```
[
  {
    "Options": [
      {
        "Label": "Checklist Option 1",
        "SectionNameToDisplay": "This should match the SectionName property of an additional section to display when checked (for example, to display the section below, you would put 'AdditionalSection' here)",
        "TooltipText": "Tooltip to display using the Material UI component"
      },
      {
        "Label": "Checklist Option 2"
      }
    ],
    "SectionName": "Initial",
    "Title": "Title to display for this group of checklist items"
  },
  {
    "Options": [
      {
        "Label": "Group Two Checklist Option 1"
      },
      {
        "Label": "Group Two Checklist Option 2"
      }
    ],
    "SectionName": "AdditionalSection",
    "Title": "Additional Section"
  }
]
```