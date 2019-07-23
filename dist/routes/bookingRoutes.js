"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bookingController = _interopRequireDefault(require("../controllers/bookingController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _bookingController["default"].create);
router.get('/', _bookingController["default"].get);
router["delete"]('/:bookingId', _bookingController["default"]["delete"]);
router.patch('/:bookingId/seat_number', _bookingController["default"].changeSeat);
var _default = router;
exports["default"] = _default;