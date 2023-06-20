"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _ChecklistToggle = _interopRequireDefault(require("../Molecules/ChecklistToggle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ChecklistSection = props => {
  return /*#__PURE__*/_react.default.createElement(_material.Paper, {
    className: "main-content",
    elevation: 10
  }, /*#__PURE__*/_react.default.createElement("h1", null, props.Title), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2,
    justifyContent: "center",
    alignItems: "center",
    direction: "row"
  }, props.Options.map((option, index) => /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_ChecklistToggle.default, _extends({}, option, {
    index: index,
    key: index + "toggle",
    checkedHandler: props.checkedHandler
  }))))));
};
var _default = ChecklistSection;
exports.default = _default;