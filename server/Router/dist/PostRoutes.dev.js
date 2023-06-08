"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _postControllers = require("../controllers/postControllers.js");

var _auth = require("../middleware/auth.js");

var _auth2 = _interopRequireDefault(require("../middlewre/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
/* READ */

router.route('/explore').get(_auth2["default"], _postControllers.getFeedPosts);
router.route('/:userId/post').get(_auth2["default"], _postControllers.getUserPosts);
router.patch("/:id/like", _auth.verifyToken, _postControllers.likePost);
var _default = router;
exports["default"] = _default;