"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DB = _interopRequireDefault(require("../DB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BusModel =
/*#__PURE__*/
function () {
  function BusModel() {
    _classCallCheck(this, BusModel);
  }

  _createClass(BusModel, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var model, manufacturer, year, number_plate, capacity, query, params, bus;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                model = _ref.model, manufacturer = _ref.manufacturer, year = _ref.year, number_plate = _ref.number_plate, capacity = _ref.capacity;
                query = "\n      INSERT INTO buses (\n        model,\n        manufacturer,\n        year,\n        number_plate,\n        capacity\n      ) \n      VALUES ($1,$2,$3,$4,$5) RETURNING *\n    ";
                params = [model, manufacturer, year, number_plate, capacity];
                _context.next = 5;
                return _DB["default"].query(query, params);

              case 5:
                bus = _context.sent;
                return _context.abrupt("return", bus);

              case 7:
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
  }]);

  return BusModel;
}();

var _default = BusModel;
exports["default"] = _default;