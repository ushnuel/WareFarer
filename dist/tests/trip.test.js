"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _index = _interopRequireDefault(require("../index"));

var _dummy = require("./dummy");

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _chai.should)();

_chai["default"].use(_chaiHttp["default"]);

var route = '/api/v1';
var utils = new _utils["default"](_index["default"]);

var _ref = new _dummy.User(),
    user = _ref.user;

var newTrip = {};
(0, _mocha.describe)('ADMIN CREATE AND GET TRIP(S) TEST', function () {
  (0, _mocha.before)('Create user account', function (done) {
    utils.postUser("".concat(route, "/auth/signup"), user).then(function () {
      utils.post("".concat(route, "/bus"), _dummy.bus).then(function (res) {
        var id = res.body.data.id;
        _dummy.trip.bus_id = id;
        done();
      })["catch"](function (err) {
        return done(err);
      });
    })["catch"](function (err) {
      return done(err);
    });
  });
  (0, _mocha.describe)('POST /trips', function () {
    (0, _mocha.it)('Admin should be able to create a trip', function (done) {
      utils.post("".concat(route, "/trips"), _dummy.trip).then(function (res) {
        res.should.have.status(201);
        res.body.should.be.an('object');
        var _res$body = res.body,
            status = _res$body.status,
            data = _res$body.data;
        (0, _chai.expect)(status).to.equal(res.status);
        (0, _chai.expect)(data).to.be.an('object');
        newTrip = _objectSpread({}, data);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    xit('Throw error if user is not an admin', function (done) {
      utils.post("".concat(route, "/trips"), _dummy.trip).then(function (res) {
        res.should.have.status(403);
        var status = res.body.status;
        (0, _chai.expect)(status).to.equal(res.status);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('PATCH /trips/<:tripId>', function () {
    (0, _mocha.it)('Admin should be able to cancel a trip', function (done) {
      utils.patch("".concat(route, "/trips/").concat(newTrip.id)).then(function (res) {
        res.body.should.status(200);
        var _res$body2 = res.body,
            status = _res$body2.status,
            data = _res$body2.data;
        (0, _chai.expect)(status).to.be.eql(res.status);
        (0, _chai.expect)(data).to.include('Trip cancelled successfully');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('GET /trips', function () {
    (0, _mocha.it)('Admin and users should be able to see all trips', function (done) {
      utils.get("".concat(route, "/trips"), _dummy.trip).then(function (res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        var _res$body3 = res.body,
            status = _res$body3.status,
            data = _res$body3.data;
        (0, _chai.expect)(status).to.equal(res.status); // eslint-disable-next-line no-unused-expressions

        (0, _chai.expect)(data).to.be.an('array').and.not.empty;
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
});