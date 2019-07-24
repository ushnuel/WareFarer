"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DB = _interopRequireDefault(require("../DB"));

var _Handlers = require("../Handlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TripModel =
/*#__PURE__*/
function () {
  function TripModel() {
    _classCallCheck(this, TripModel);
  }

  _createClass(TripModel, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var bus_id, origin, destination, fare, created_on, query, params, trip;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                bus_id = _ref.bus_id, origin = _ref.origin, destination = _ref.destination, fare = _ref.fare;
                created_on = new Date();
                query = "\n    INSERT INTO trips(\n      bus_id,\n      origin,\n      destination,\n      fare,\n      created_on\n    )\n    VALUES ($1,$2,$3,$4,$5)\n    RETURNING *\n    ";
                params = [bus_id, origin, destination, fare, created_on];
                _context.next = 6;
                return _DB["default"].query(query, params);

              case 6:
                trip = _context.sent;
                return _context.abrupt("return", trip);

              case 8:
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
    key: "cancel",
    value: function () {
      var _cancel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var query, param, trip;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (id) {
                  _context2.next = 2;
                  break;
                }

                throw new _Handlers.ErrorHandler('No trip found', 404);

              case 2:
                query = "\n    UPDATE trips\n      SET status = 'cancelled'\n      WHERE id = $1;\n    ";
                param = [id];
                _context2.next = 6;
                return _DB["default"].query(query, param);

              case 6:
                trip = _context2.sent;
                return _context2.abrupt("return", trip);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function cancel(_x2) {
        return _cancel.apply(this, arguments);
      }

      return cancel;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var query, param, booking;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (id) {
                  _context3.next = 2;
                  break;
                }

                throw new _Handlers.ErrorHandler('No trip found', 404);

              case 2:
                query = "\n    SELECT * FROM trips\n      WHERE id = $1\n    ";
                param = [id];
                _context3.next = 6;
                return _DB["default"].query(query, param);

              case 6:
                booking = _context3.sent;

                if (booking) {
                  _context3.next = 9;
                  break;
                }

                throw new _Handlers.ErrorHandler("Fatal! No booking with id ".concat(id, " found"), 404);

              case 9:
                return _context3.abrupt("return", booking);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var query, trips;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = 'SELECT * FROM trips';
                _context4.next = 3;
                return _DB["default"].query(query, '', true);

              case 3:
                trips = _context4.sent;

                if (trips) {
                  _context4.next = 6;
                  break;
                }

                throw new _Handlers.ErrorHandler('No records found', 404);

              case 6:
                return _context4.abrupt("return", trips);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);

  return TripModel;
}();

exports["default"] = TripModel;