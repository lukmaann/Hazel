"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UserSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  friends: {
    type: Array,
    "default": []
  },
  firstName: String,
  lastName: String,
  mobile: Number,
  profile: String,
  address: String
});
exports.UserSchema = UserSchema;

var _default = _mongoose["default"].model.Users || _mongoose["default"].model("User", UserSchema);

exports["default"] = _default;