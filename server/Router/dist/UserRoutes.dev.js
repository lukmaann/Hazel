"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _appController = require("../controllers/appController.js");

var _usercontroller = require("../controllers/usercontroller.js");

var _auth = _interopRequireDefault(require("../middlewre/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
/* READ */

router.route("/user/:username").get(_appController.getUser);
router.route('/:id/friends').get(_auth["default"], _usercontroller.getUserFriends);
/* UPDATE */

router.route('/:id/:friendsId').patch(_auth["default"], _usercontroller.addRemoveFriend);
var _default = router;
exports["default"] = _default;