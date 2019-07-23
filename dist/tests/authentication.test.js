"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _index = _interopRequireDefault(require("../index"));

var _user = _interopRequireDefault(require("./dummy/user"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();
var route = '/api/v1/auth';
var utils = new _utils["default"](_index["default"]);

var _ref = new _user["default"](),
    user = _ref.user,
    invalidUser = _ref.invalidUser;

(0, _mocha.describe)('User Authentication', function () {
  (0, _mocha.describe)('POST auth/signup', function () {
    (0, _mocha.it)('User should be able to create account', function (done) {
      utils.postUser("".concat(route, "/signup"), user).then(function (res) {
        res.should.have.status(201);
        res.body.should.be.an('object');
        var _res$body = res.body,
            status = _res$body.status,
            data = _res$body.data;
        (0, _chai.expect)(status).to.equal(res.status);
        (0, _chai.expect)(data).to.be.an('object');
        (0, _chai.expect)(data).not.to.have.property('password');
        (0, _chai.expect)(data).to.have.property('id');
        (0, _chai.expect)(data).to.have.property('token');
        var email = data.email;
        (0, _chai.expect)(email).to.eql(user.email);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('POST auth/signin', function () {
    (0, _mocha.it)('User should be able to sign in', function (done) {
      utils.postUser("".concat(route, "/signin"), user).then(function (res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        var _res$body2 = res.body,
            data = _res$body2.data,
            status = _res$body2.status;
        (0, _chai.expect)(status).to.eql(res.status);
        (0, _chai.expect)(data).to.be.an('object');
        var email = data.email;
        (0, _chai.expect)(email).to.eql(user.email);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    (0, _mocha.it)('Throw error if no user is found', function (done) {
      utils.postUser("".concat(route, "/signin"), invalidUser, false).then(function (res) {
        res.should.have.status(404);
        var status = res.body.status;
        (0, _chai.expect)(status).to.equal(res.status);
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
});