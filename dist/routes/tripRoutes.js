"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _tripController = _interopRequireDefault(require("../controllers/tripController"));

var _jwtGenerator = _interopRequireDefault(require("../middleware/jwtGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _jwtGenerator["default"].authorizeAdmin, _tripController["default"].create);
router.get('/', _tripController["default"].getAll);
router.patch('/:tripId', _jwtGenerator["default"].authorizeAdmin, _tripController["default"].cancel);
var _default = router;
exports["default"] = _default;