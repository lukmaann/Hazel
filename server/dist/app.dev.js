"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _multer = _interopRequireDefault(require("multer"));

var _morgan = _interopRequireDefault(require("morgan"));

var _conn = _interopRequireDefault(require("./database/conn.js"));

var _LoginRoutes = _interopRequireDefault(require("./Router/LoginRoutes.js"));

var _UserRoutes = _interopRequireDefault(require("./Router/UserRoutes.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: "200mb"
}));
app.use(_bodyParser["default"].json({
  extended: true,
  limit: '200mb'
}));
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.disable('x-powered-by');
app.get("/", function (req, res) {
  res.status(201).json("hello");
});
app.use('/api', _LoginRoutes["default"]);
app.use('/api', _UserRoutes["default"]);
(0, _conn["default"])().then(function () {
  app.listen(3000, function () {
    return console.log("server connected to db started on port 3000");
  });
});