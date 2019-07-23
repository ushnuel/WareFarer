"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = require("../models");

var _Handlers = require("../Handlers");

var _jwtGenerator = _interopRequireDefault(require("../middleware/jwtGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var user, token, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.UserModel.create(req.body);

              case 3:
                user = _context.sent;
                _context.next = 6;
                return _jwtGenerator["default"].generateToken({
                  id: user.id,
                  email: user.email,
                  isAdmin: user.is_admin
                });

              case 6:
                token = _context.sent;
                data = _objectSpread({
                  token: token
                }, user);

                _Handlers.feedbackHandler.message(res, data, 201);

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      function signUp(_x, _x2, _x3) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var user, token, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.UserModel.getUserByEmail(req.body);

              case 3:
                user = _context2.sent;
                _context2.next = 6;
                return _jwtGenerator["default"].generateToken({
                  id: user.id,
                  email: user.email,
                  isAdmin: user.is_admin
                });

              case 6:
                token = _context2.sent;
                data = _objectSpread({
                  token: token
                }, user);

                _Handlers.feedbackHandler.message(res, data, 200);

                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                next(_context2.t0);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function signIn(_x4, _x5, _x6) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;