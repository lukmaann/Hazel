"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postSchema = _mongoose["default"].Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  location: String,
  description: String,
  picturePath: String,
  profile: String,
  likes: {
    type: Map,
    of: Boolean
  },
  comments: {
    type: Array,
    "default": []
  }
}, {
  timestamps: true
});

var Post = _mongoose["default"].model("Post", postSchema);

var _default = Post;
exports["default"] = _default;