"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userAuthRoutes = _interopRequireDefault(require("./userAuthRoutes"));

var _tripRoutes = _interopRequireDefault(require("./tripRoutes"));

var _busRoutes = _interopRequireDefault(require("./busRoutes"));

var _bookingRoutes = _interopRequireDefault(require("./bookingRoutes"));

var _jwtGenerator = _interopRequireDefault(require("../middleware/jwtGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/auth', _userAuthRoutes["default"]);
router.use('/trips', _jwtGenerator["default"].authorize, _tripRoutes["default"]);
router.use('/bus', _jwtGenerator["default"].authorize, _busRoutes["default"]);
router.use('/bookings', _jwtGenerator["default"].authorize, _bookingRoutes["default"]);
var _default = router;
exports["default"] = _default;