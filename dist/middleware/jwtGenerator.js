"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _Handlers = require("../Handlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var privateKey = _fs["default"].readFileSync('./pvt.key', 'utf8');

var publicKey = _fs["default"].readFileSync('./pub.key', 'utf8');

var signInOptions = {
  expiresIn: '8h',
  algorithm: 'RS256'
};

var jwtGenerator =
/*#__PURE__*/
function () {
  function jwtGenerator() {
    _classCallCheck(this, jwtGenerator);
  }

  _createClass(jwtGenerator, null, [{
    key: "generateToken",
    value: function generateToken(payload) {
      return _jsonwebtoken["default"].sign(payload, privateKey, signInOptions);
    }
  }, {
    key: "authorize",
    value: function authorize(req, res, next) {
      try {
        var header = req.headers.authorization.split(' ');
        var bearer = header[0];
        var jwtToken = header[1];

        if (header.length !== 2 && bearer !== 'Bearer') {
          throw new _Handlers.ErrorHandler('The request header should start with Bearer and then the token', 401);
        }

        if (jwtToken) {
          _jsonwebtoken["default"].verify(jwtToken, publicKey, function (err, decoded) {
            if (err) {
              throw new _Handlers.ErrorHandler('Authentication failed: Invalid token', 401);
            }

            req.user = decoded;
            next();
          });
        }
      } catch (error) {
        next(error);
      }
    }
  }, {
    key: "authorizeAdmin",
    value: function authorizeAdmin(req, res, next) {
      if (!req.user.isAdmin) {
        next(new _Handlers.ErrorHandler('Forbidden access!', 403));
      } else {
        next();
      }
    }
  }]);

  return jwtGenerator;
}();

var _default = jwtGenerator;
exports["default"] = _default;