"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _ChecklistSection = _interopRequireDefault(require("../Organisms/ChecklistSection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ChecklistForm = props => {
  console.log(props);
  const [data, setData] = (0, _react.useState)([props.ChecklistData.find(section => section.SectionName === props.initialSectionName)]);
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
      sectionsToDisplay = sectionsToDisplay.filter(section => section.SectionName === props.initialSectionName || sectionsToDisplay.some(function (sectionToCheckVisible) {
        return sectionToCheckVisible.Options.some(function (option) {
          return option.SectionNameToDisplay && option.SectionNameToDisplay === section.SectionName;
        });
      }));
    }
    console.log(sectionsToDisplay);
    setData(sectionsToDisplay);
    console.log(data);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, data.map(section => section && /*#__PURE__*/_react.default.createElement(_ChecklistSection.default, _extends({
    key: section.SectionName
  }, section, {
    checkedHandler: checkedHandler
  }))));
};
var _default = ChecklistForm;
exports.default = _default;