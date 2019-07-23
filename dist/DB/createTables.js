"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var dropUsers = 'DROP TABLE IF EXISTS users CASCADE';
var createUser = "\nCREATE TABLE IF NOT EXISTS users\n(\n    id bigserial NOT NULL,\n    email character varying(250) NOT NULL,\n    first_name character varying(50) NOT NULL,\n    last_name character varying(50) NOT NULL,\n    password character varying(100) NOT NULL,\n    is_admin boolean DEFAULT FALSE,\n    CONSTRAINT p_key PRIMARY KEY (id)\n)\n";
var dropBus = 'DROP TABLE IF EXISTS buses CASCADE';
var createBus = "\nCREATE TABLE IF NOT EXISTS buses\n(\n    id bigserial NOT NULL,\n    number_plate character varying(20) NOT NULL,\n    manufacturer character varying(30) NOT NULL,\n    model character varying(50) NOT NULL,\n    year character varying(15) NOT NULL,\n    capacity integer NOT NULL,\n    CONSTRAINT bus_key PRIMARY KEY (id)\n);\n";
var dropBookings = 'DROP TABLE IF EXISTS bookings CASCADE';
var createBookings = "\nCREATE TABLE IF NOT EXISTS bookings\n(\n    id bigserial NOT NULL,\n    user_id bigserial NOT NULL,\n    bus_id bigserial NOT NULL,\n    trip_id bigserial NOT NULL,\n    trip_date timestamp(6) with time zone,\n    seat_number integer,\n    CONSTRAINT booking_pkey PRIMARY KEY (id),\n    CONSTRAINT busfkey FOREIGN KEY (bus_id)\n        REFERENCES buses (id),\n    CONSTRAINT tripfkey FOREIGN KEY (trip_id)\n        REFERENCES trips (id),\n    CONSTRAINT userfkey FOREIGN KEY (user_id)\n        REFERENCES users (id)\n);\n";
var dropTrips = 'DROP TABLE IF EXISTS trips CASCADE';
var createTrips = "\nCREATE TABLE IF NOT EXISTS trips\n(\n    id bigserial NOT NULL,\n    bus_id bigserial NOT NULL,\n    origin character varying(100) NOT NULL,\n    destination character varying(100) NOT NULL,\n    created_on timestamp(6) NOT NULL,\n    fare money NOT NULL,\n    status character varying(50) DEFAULT 'active',    \n    CONSTRAINT pkey PRIMARY KEY (id),\n    CONSTRAINT busfkey FOREIGN KEY (bus_id)\n        REFERENCES buses (id)\n);\n";

var CreateTables =
/*#__PURE__*/
function () {
  function CreateTables() {
    _classCallCheck(this, CreateTables);
  }

  _createClass(CreateTables, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _["default"].query(dropUsers);

              case 2:
                _context.next = 4;
                return _["default"].query(dropBus);

              case 4:
                _context.next = 6;
                return _["default"].query(dropBookings);

              case 6:
                _context.next = 8;
                return _["default"].query(dropTrips);

              case 8:
                _context.next = 10;
                return _["default"].query(createUser);

              case 10:
                _context.next = 12;
                return _["default"].query(createBus);

              case 12:
                _context.next = 14;
                return _["default"].query(createTrips);

              case 14:
                _context.next = 16;
                return _["default"].query(createBookings);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return CreateTables;
}();

CreateTables.create()["catch"](function (err) {
  return console.log(err);
});