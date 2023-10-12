"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
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
  var _ref;
  // If a checkbox doesn't have any tags, then it is not dependent on anything to be displayed
  const [data, setData] = (0, _react.useState)([props.ChecklistData.find(checkbox => !checkbox.tags)]);
  const allTags = props.ChecklistData.map(checkbox => checkbox.tags).filter(tag => tag);
  const onAutocompleteChange = (event, values, reason) => {
    onChange(reason == 'selectOption', values);
  };
  const checkedHandler = (event, tagsToToggle) => {
    onChange(event.target.checked, tagsToToggle);
  };
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
  };
  const getSelectedTags = () => {
    return data.filter(checkbox => checkbox.tags).map(checkbox => checkbox.tags);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Container.default, {
    sx: {
      marginTop: '1%'
    }
  }, /*#__PURE__*/_react.default.createElement(_Autocomplete.default, {
    multiple: true,
    filterSelectedOptions: true,
    value: ((_ref = [getSelectedTags()]) === null || _ref === void 0 ? void 0 : _ref.length) > 0 ? getSelectedTags() : [],
    options: allTags,
    getOptionLabel: option => option,
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
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_ChecklistToggle.default, _extends({}, option, {
    index: index,
    key: index + "toggle",
    checkedHandler: checkedHandler
  }))))))));
};
var _default = ChecklistForm;
exports.default = _default;