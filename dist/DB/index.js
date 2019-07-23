"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = new _pg.Pool({
  connectionString: _config["default"].DB
});

var DB =
/*#__PURE__*/
function () {
  function DB() {
    _classCallCheck(this, DB);
  }

  _createClass(DB, null, [{
    key: "query",
    value: function () {
      var _query = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(queryStream, params) {
        var anArray,
            oneLineQuery,
            stream,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                anArray = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
                oneLineQuery = this.removeNewlines(queryStream);
                _context.next = 4;
                return pool.query(oneLineQuery, params);

              case 4:
                stream = _context.sent;
                return _context.abrupt("return", anArray ? stream.rows : stream.rows[0]);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function query(_x, _x2) {
        return _query.apply(this, arguments);
      }

      return query;
    }()
  }, {
    key: "removeNewlines",
    value: function removeNewlines(string) {
      return string.replace(/\n/g, '');
    }
  }]);

  return DB;
}();

var _default = DB;
exports["default"] = _default;