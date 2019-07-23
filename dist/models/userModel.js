"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _DB = _interopRequireDefault(require("../DB"));

var _Handlers = require("../Handlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserModel =
/*#__PURE__*/
function () {
  function UserModel() {
    _classCallCheck(this, UserModel);
  }

  _createClass(UserModel, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var email, first_name, last_name, password, is_admin, query, hashedPassword, params, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = _ref.email, first_name = _ref.first_name, last_name = _ref.last_name, password = _ref.password;

                if (email && password) {
                  _context.next = 3;
                  break;
                }

                throw new _Handlers.ErrorHandler('Enter email and password');

              case 3:
                is_admin = true;
                query = "\n    INSERT INTO users (\n      email,\n      first_name,\n      last_name,\n      password,\n      is_admin\n    )\n    VALUES($1,$2,$3,$4,$5)\n      RETURNING *\n    ";
                _context.next = 7;
                return _bcrypt["default"].hash(password, 15);

              case 7:
                hashedPassword = _context.sent;
                params = [email, first_name, last_name, hashedPassword, is_admin];
                _context.next = 11;
                return _DB["default"].query(query, params);

              case 11:
                user = _context.sent;
                return _context.abrupt("return", UserModel.exclude(user));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var query, param, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n      SELECT * FROM users\n        WHERE \n          id = $1\n    ";
                param = [id];
                _context2.next = 4;
                return _DB["default"].query(query, param);

              case 4:
                user = _context2.sent;
                return _context2.abrupt("return", UserModel.exclude(user));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUserById(_x2) {
        return _getUserById.apply(this, arguments);
      }

      return getUserById;
    }()
  }, {
    key: "getUserByEmail",
    value: function () {
      var _getUserByEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref2) {
        var email, password, query, param, user, isPassword;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = _ref2.email, password = _ref2.password;
                // sign in method
                query = "\n    SELECT * FROM users\n      WHERE\n        email = $1";
                param = [email];
                _context3.next = 5;
                return _DB["default"].query(query, param);

              case 5:
                user = _context3.sent;

                if (user) {
                  _context3.next = 8;
                  break;
                }

                throw new _Handlers.ErrorHandler('incorrect username or password');

              case 8:
                _context3.next = 10;
                return _bcrypt["default"].compare(password, user.password);

              case 10:
                isPassword = _context3.sent;

                if (isPassword) {
                  _context3.next = 13;
                  break;
                }

                throw new _Handlers.ErrorHandler('incorrect username or password');

              case 13:
                return _context3.abrupt("return", UserModel.exclude(user));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getUserByEmail(_x3) {
        return _getUserByEmail.apply(this, arguments);
      }

      return getUserByEmail;
    }()
  }, {
    key: "emailExist",
    value: function () {
      var _emailExist = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(email) {
        var query, param, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "\n    SELECT * FROM users\n      WHERE \n        email = $1\n    ";
                param = [email];
                _context4.next = 4;
                return _DB["default"].query(query, param);

              case 4:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 7;
                  break;
                }

                throw new _Handlers.ErrorHandler('Email already exists', 401);

              case 7:
                return _context4.abrupt("return", user);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function emailExist(_x4) {
        return _emailExist.apply(this, arguments);
      }

      return emailExist;
    }()
  }, {
    key: "exclude",
    value: function exclude(_ref3) {
      var password = _ref3.password,
          otherColumns = _objectWithoutProperties(_ref3, ["password"]);

      return otherColumns;
    }
  }]);

  return UserModel;
}();

var _default = UserModel;
exports["default"] = _default;