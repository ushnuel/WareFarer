"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireDefault(require("chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils =
/*#__PURE__*/
function () {
  function Utils(server) {
    _classCallCheck(this, Utils);

    this.server = server;
  }

  _createClass(Utils, [{
    key: "postUser",
    value: function () {
      var _postUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(route, user) {
        var haveToken,
            res,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                haveToken = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;
                _context.next = 3;
                return _chai["default"].request(this.server).post(route).send(user);

              case 3:
                res = _context.sent;

                if (haveToken) {
                  this.token = res.body.data.token;
                }

                return _context.abrupt("return", res);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postUser(_x, _x2) {
        return _postUser.apply(this, arguments);
      }

      return postUser;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(route, obj) {
        var token,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : this.token;
                return _context2.abrupt("return", _chai["default"].request(this.server).post(route).auth(token, {
                  type: 'bearer'
                }).send(obj));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x3, _x4) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(route, obj) {
        var token,
            res,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : this.token;
                _context3.next = 3;
                return _chai["default"].request(this.server).get(route).auth(token, {
                  type: 'bearer'
                }).query(obj);

              case 3:
                res = _context3.sent;
                return _context3.abrupt("return", res);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x5, _x6) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(route, obj) {
        var token,
            res,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : this.token;
                _context4.next = 3;
                return _chai["default"].request(this.server)["delete"](route).auth(token, {
                  type: 'bearer'
                });

              case 3:
                res = _context4.sent;
                return _context4.abrupt("return", res);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(route, obj) {
        var token,
            res,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                token = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : this.token;
                _context5.next = 3;
                return _chai["default"].request(this.server).patch(route).auth(token, {
                  type: 'bearer'
                }).send(obj);

              case 3:
                res = _context5.sent;
                return _context5.abrupt("return", res);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function patch(_x9, _x10) {
        return _patch.apply(this, arguments);
      }

      return patch;
    }()
  }]);

  return Utils;
}();

exports["default"] = Utils;