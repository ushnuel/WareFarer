"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable camelcase */
var User = function User() {
  _classCallCheck(this, User);

  this.user = {
    email: 'usher@gmail.com',
    first_name: 'Emmanuel',
    last_name: 'Chinazom',
    password: 'ushermankellyy'
  };
  this.invalidUser = {
    email: 'invalid@gmail.com',
    first_name: 'Emmanuel',
    last_name: 'Chinazom',
    password: 'invalid'
  };
};

var _default = User;
exports["default"] = _default;