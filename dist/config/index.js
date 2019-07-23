"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var config = {};

switch (process.env.NODE_ENV) {
  case 'dev':
    config.PORT = process.env.PORT;
    config.DB = process.env.DB;
    break;

  case 'prod':
    config.PORT = process.env.PORT;
    config.DB = process.env.DB;
    break;

  default:
    config.PORT = process.env.PORT || 3000;
    config.DB = process.env.DB;
}

var _default = config;
exports["default"] = _default;