"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _ = _interopRequireDefault(require(".."));

var _utils = _interopRequireDefault(require("./utils"));

var _dummy = require("./dummy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();

var _ref = new _dummy.User(),
    user = _ref.user;

var utils = new _utils["default"](_["default"]);
var route = '/api/v1/';
var newBooking = {};
(0, _mocha.describe)('USER OR ADMIN BOOKING TESTS', function () {
  (0, _mocha.before)('Sign up as admin', function (done) {
    utils.postUser("".concat(route, "/auth/signup"), user).then(function () {
      utils.post("".concat(route, "/bus"), _dummy.bus).then(function (res) {
        var id = res.body.data.id;
        _dummy.trip.bus_id = id;
        _dummy.booking.bus_id = id;
      }).then(function () {
        utils.post("".concat(route, "/trips"), _dummy.trip).then(function (res) {
          var id = res.body.data.id;
          _dummy.booking.trip_id = id;
          done();
        })["catch"](function (err) {
          return done(err);
        });
      });
    })["catch"](function (err) {
      return done(err);
    });
  });
  (0, _mocha.describe)('User or Admin Book a seat number', function () {
    (0, _mocha.it)('POST /bookings', function (done) {
      utils.post("".concat(route, "/bookings"), _dummy.booking).then(function (res) {
        res.body.should.be.an('object');
        res.should.have.status(201);
        var _res$body = res.body,
            status = _res$body.status,
            data = _res$body.data;
        (0, _chai.expect)(status).to.equal(res.status);
        (0, _chai.expect)(data).to.be.an('object');
        (0, _chai.expect)(data).to.have.property('bus_id');
        (0, _chai.expect)(data).to.have.property('user_id');
        (0, _chai.expect)(data).to.have.property('trip_id');
        newBooking = _objectSpread({}, data);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  xdescribe('User can delete his or her booking', function () {
    (0, _mocha.it)('DELETE /bookings/<:bookingId>/', function (done) {
      utils["delete"]("".concat(route, "/bookings/").concat(newBooking.id), _dummy.booking).then(function (res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        var status = res.body.status;
        (0, _chai.expect)(status).to.equal(res.status);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('Throw error if invalid booking id is provided for delete', function () {
    (0, _mocha.it)('DELETE /bookings/<:bookingId>/', function (done) {
      utils["delete"]("".concat(route, "/bookings/").concat(newBooking.id + 1), _dummy.booking).then(function (res) {
        res.should.have.status(404);
        res.body.should.be.an('object');
        var status = res.body.status;
        (0, _chai.expect)(status).to.equal(res.status);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('User or Admin should see all trips', function () {
    (0, _mocha.it)('GET /bookings', function (done) {
      utils.get("".concat(route, "/bookings"), _dummy.booking).then(function (res) {
        res.body.should.be.an('object');
        res.should.have.status(200);
        var _res$body2 = res.body,
            data = _res$body2.data,
            status = _res$body2.status;
        (0, _chai.expect)(data).to.be.an('array').and.not.empty;
        (0, _chai.expect)(status).to.be.equal(res.status);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('User can change seat number after booking', function () {
    (0, _mocha.it)('PATCH /bookings/<:bookingId>/seat_number', function (done) {
      var newSeat = Number(newBooking.seat_number) + 1;
      var obj = {
        seat_number: newSeat
      };
      utils.patch("".concat(route, "/bookings/").concat(newBooking.id, "/seat_number"), obj).then(function (res) {
        res.body.should.have.status(200);
        var data = res.body.data;
        var seat_number = data.seat_number;
        (0, _chai.expect)(seat_number).not.eql(_dummy.booking.seat_number);
        (0, _chai.expect)(seat_number).to.eql(newSeat);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
});