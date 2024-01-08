## Simple npm package for building dynamic checklists in React

### Install

Install using `npm install dynamic-checklist`

### Usage 

In a React app, import the ChecklistForm components:  
`import ChecklistForm from 'dynamic-checklist';`

Pass in the data for the component (see example below of the data file that can be used)

`import data from "./data-file.json";`

`<ChecklistForm ChecklistData={data} />`

#### Example of data for checklist

```
[
	{
		"label" : "Checkbox 1",
		"tooltipText" : "This initial checkbox will display since it has no dependent tags",
		"show" : ["test"]
	},
	{
		"label" : "Checkbox 2",
		"tooltipText": "This checkbox will be revealed once a checkbox is selected that has a \"Show\" value matching the tag below",
		"tags" : ["test"]
	}
]
```