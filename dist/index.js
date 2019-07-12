"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _Handlers = require("./Handlers");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use('/api/v1', _routes["default"]);
app.get('/', function (req, res) {
  return res.json({
    id: req.user.id,
    message: 'Welcome to Warefarer server API'
  });
});
app.use('*', function (req, res, next) {
  var error = new _Handlers.ErrorHandler('Not Found', 404);
  next(error);
});
app.use(_Handlers.feedbackHandler.error);
app.listen(_config["default"].PORT, function () {
  console.log('app has started on', _config["default"].PORT);
});
var _default = app;
exports["default"] = _default;