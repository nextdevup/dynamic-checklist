"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _react = _interopRequireWildcard(require("react"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Info = _interopRequireDefault(require("@mui/icons-material/Info"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ChecklistToggle = props => {
  const [checked, setChecked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (props.show) {
      const hasSelectedTag = props.show.filter(elem => props.selectedTags.includes(elem)).length > 0;
      if (hasSelectedTag !== checked) {
        setChecked(hasSelectedTag);
      }
    }
  }, [props.show, props.selectedTags]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: checked,
      onChange: e => {
        setChecked(e.target.checked);
        props.checkedHandler(e, props.show);
      },
      key: props.index
    }),
    label: props.label,
    key: props.index + "label"
  }), props.tooltipText && /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: props.tooltipText,
    key: props.index + "Tooltip"
  }, /*#__PURE__*/_react.default.createElement(_Info.default, {
    fontSize: "small",
    key: props.index + "infoIcon"
  })));
};
var _default = ChecklistToggle;
exports.default = _default;