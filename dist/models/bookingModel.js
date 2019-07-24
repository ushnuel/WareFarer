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

var BookingModel =
/*#__PURE__*/
function () {
  function BookingModel() {
    _classCallCheck(this, BookingModel);
  }

  _createClass(BookingModel, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user_id, _ref) {
        var trip_id, bus_id, trip_date, seat_number, query, params, booking;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                trip_id = _ref.trip_id, bus_id = _ref.bus_id, trip_date = _ref.trip_date, seat_number = _ref.seat_number;
                query = "\n    INSERT INTO bookings(\n     user_id,\n     trip_id,\n     bus_id,\n     seat_number,\n     trip_date\n   ) \n   VALUES ($1,$2,$3,$4,$5)\n    RETURNING *;\n    ";
                params = [user_id, trip_id, bus_id, seat_number, trip_date];
                _context.next = 5;
                return _DB["default"].query(query, params);

              case 5:
                booking = _context.sent;
                return _context.abrupt("return", booking);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var query, bookings;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n    SELECT * from bookings\n    ";
                _context2.next = 3;
                return _DB["default"].query(query, '', true);

              case 3:
                bookings = _context2.sent;
                return _context2.abrupt("return", bookings);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
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

                throw new _Handlers.ErrorHandler('Invalid id', 404);

              case 2:
                query = "\n    DELETE FROM bookings\n      WHERE id = $1;";
                param = [id];
                _context3.next = 6;
                return _DB["default"].query(query, param);

              case 6:
                booking = _context3.sent;
                return _context3.abrupt("return", booking);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id) {
        var query, param, booking;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "\n    SELECT * FROM bookings\n      WHERE id = $1;";
                param = [id];
                _context4.next = 4;
                return _DB["default"].query(query, param);

              case 4:
                booking = _context4.sent;

                if (booking) {
                  _context4.next = 7;
                  break;
                }

                throw new _Handlers.ErrorHandler('fatal! Booking not found', 404);

              case 7:
                return _context4.abrupt("return", booking);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function get(_x4) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "updateSeat",
    value: function () {
      var _updateSeat = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id, _ref2) {
        var seat_number, query, param, booking;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                seat_number = _ref2.seat_number;

                if (!(!Number.isFinite(seat_number) || !seat_number)) {
                  _context5.next = 3;
                  break;
                }

                throw new _Handlers.ErrorHandler('Invalid seat number', 404);

              case 3:
                query = "\n    UPDATE bookings\n      SET seat_number = $1\n        WHERE id = $2\n        RETURNING *;";
                param = [seat_number, id];
                booking = _DB["default"].query(query, param)["catch"](function () {
                  throw new _Handlers.ErrorHandler('Resource not found', 404);
                });
                return _context5.abrupt("return", booking);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateSeat(_x5, _x6) {
        return _updateSeat.apply(this, arguments);
      }

      return updateSeat;
    }()
  }]);

  return BookingModel;
}();

exports["default"] = BookingModel;