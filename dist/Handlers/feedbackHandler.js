"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var feedbackHandler =
/*#__PURE__*/
function () {
  function feedbackHandler() {
    _classCallCheck(this, feedbackHandler);
  }

  _createClass(feedbackHandler, null, [{
    key: "message",
    value: function message(res, data) {
      var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
      res.status(status).json({
        status: status,
        data: data
      });
    }
  }, {
    key: "error",
    value: function error(err, req, res, next) {
      var _err$status = err.status,
          status = _err$status === void 0 ? 500 : _err$status,
          message = err.message;
      var error = status === 500 ? 'Server Error' : message;
      console.log('err: ', err);
      res.status(status).json({
        status: status,
        error: error
      });
    }
  }]);

  return feedbackHandler;
}();

var _default = feedbackHandler;
exports["default"] = _default;