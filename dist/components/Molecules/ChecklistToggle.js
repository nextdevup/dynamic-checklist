"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Info = _interopRequireDefault(require("@mui/icons-material/Info"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ChecklistToggle = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: props.tagSelected,
      onChange: e => props.checkedHandler(e, props.show),
      key: props.index
    }),
    label: props.label,
    key: props.index + "label"
  }), props.TooltipText && /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: props.tooltipText,
    key: props.index + "Tooltip"
  }, /*#__PURE__*/_react.default.createElement(_Info.default, {
    fontSize: "small",
    key: props.index + "infoIcon"
  })));
};
var _default = ChecklistToggle;
exports.default = _default;