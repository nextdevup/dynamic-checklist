"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.flat-map.js");
require("core-js/modules/es.array.unscopables.flat-map.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.sort.js");
var _react = _interopRequireWildcard(require("react"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _Container = _interopRequireDefault(require("@mui/material/Container"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _ChecklistToggle = _interopRequireDefault(require("../Molecules/ChecklistToggle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ChecklistForm = props => {
  // If a checkbox doesn't have any tags, then it is not dependent on anything to be displayed
  const [data, setData] = (0, _react.useState)(props.ChecklistData.filter(checkbox => !(checkbox !== null && checkbox !== void 0 && checkbox.tags)));
  const [selectedTags, setSelectedTags] = (0, _react.useState)([]);
  const allTags = [...new Set(props.ChecklistData.flatMap(checkbox => {
    var _checkbox$tags$filter, _checkbox$tags;
    return (_checkbox$tags$filter = (_checkbox$tags = checkbox.tags) === null || _checkbox$tags === void 0 ? void 0 : _checkbox$tags.filter(tag => tag !== undefined)) !== null && _checkbox$tags$filter !== void 0 ? _checkbox$tags$filter : [];
  }))];
  const onAutocompleteChange = (event, values, reason) => {
    onChange(reason == 'selectOption', values, true, false);
  };
  const checkedHandler = (event, showProp) => {
    onChange(event.target.checked, showProp, false, true);
  };
  const onChange = function onChange(isSelected, tagsToToggle) {
    let fromAutoComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let fromCheckbox = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let checkboxesToDisplay = [...props.ChecklistData];
    let updatedSelectedTags = [];
    if (fromAutoComplete) {
      updatedSelectedTags = tagsToToggle !== null && tagsToToggle !== void 0 ? tagsToToggle : [];
    } else if (tagsToToggle !== null && tagsToToggle !== void 0 && tagsToToggle.length) {
      if (isSelected) {
        var _Array$from;
        updatedSelectedTags = (_Array$from = Array.from(new Set([...selectedTags, ...tagsToToggle]))) !== null && _Array$from !== void 0 ? _Array$from : [];
      } else {
        var _selectedTags$filter;
        updatedSelectedTags = (_selectedTags$filter = selectedTags.filter(tag => !tagsToToggle.includes(tag))) !== null && _selectedTags$filter !== void 0 ? _selectedTags$filter : [];
      }
    } else {
      return;
    }
    checkboxesToDisplay = checkboxesToDisplay.filter(checkbox => {
      return !checkbox.tags || updatedSelectedTags.some(tag => checkbox.tags.includes(tag));
    });

    // Sort based on tags so that new checkboxes append to the end (otherwise will inject based on data order)
    checkboxesToDisplay.sort((firstCheckbox, secondCheckbox) => {
      var _firstCheckbox$tags$m, _firstCheckbox$tags, _secondCheckbox$tags$, _secondCheckbox$tags;
      const firstTagIndexes = [...((_firstCheckbox$tags$m = (_firstCheckbox$tags = firstCheckbox.tags) === null || _firstCheckbox$tags === void 0 ? void 0 : _firstCheckbox$tags.map(tag => updatedSelectedTags.indexOf(tag))) !== null && _firstCheckbox$tags$m !== void 0 ? _firstCheckbox$tags$m : [0])];
      ;
      const secondTagIndexes = [...((_secondCheckbox$tags$ = (_secondCheckbox$tags = secondCheckbox.tags) === null || _secondCheckbox$tags === void 0 ? void 0 : _secondCheckbox$tags.map(tag => updatedSelectedTags.indexOf(tag))) !== null && _secondCheckbox$tags$ !== void 0 ? _secondCheckbox$tags$ : [0])];
      ;

      // Remove any -1 values for non-matches to make sure they're not sorted first
      removeNegativeIndexes(firstTagIndexes);
      removeNegativeIndexes(secondTagIndexes);

      // Per docs, return a negative num if you want first elem sorted earlier or positive if second element should sort first
      return Math.min(...firstTagIndexes) - Math.min(...secondTagIndexes);
    });
    setData(checkboxesToDisplay);
    setSelectedTags(updatedSelectedTags);
  };
  const removeNegativeIndexes = arr => {
    let negativeIndex = arr.indexOf(-1);
    while (negativeIndex !== -1) {
      if (negativeIndex !== -1) {
        arr[negativeIndex] = Infinity;
      }
      negativeIndex = arr.indexOf(-1);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Container.default, {
    sx: {
      marginTop: '1%'
    }
  }, /*#__PURE__*/_react.default.createElement(_Autocomplete.default, {
    multiple: true,
    filterSelectedOptions: true,
    value: selectedTags !== null && selectedTags !== void 0 ? selectedTags : [],
    options: allTags,
    getOptionLabel: option => option !== null && option !== void 0 ? option : ''
    // isOptionEqualToValue has to be explicitly defined to compare without type matching
    ,
    isOptionEqualToValue: (option, value) => option == value,
    renderInput: params => /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, params, {
      label: "Search...",
      variant: "outlined"
    })),
    onChange: onAutocompleteChange,
    id: "tags-autocomplete",
    sx: {
      width: '50%',
      margin: 'auto'
    }
  }), data && /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: "main-content",
    elevation: 10,
    sx: {
      marginTop: '3%',
      minHeight: '30vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 2,
    justifyContent: "center",
    alignItems: "center",
    direction: "row"
  }, data.map((option, index) => /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 3,
    key: index + "grid"
  }, /*#__PURE__*/_react.default.createElement(_ChecklistToggle.default, _extends({}, option, {
    index: index,
    key: index + "toggle",
    checkedHandler: checkedHandler,
    selectedTags: selectedTags
  }))))))));
};
var _default = ChecklistForm;
exports.default = _default;