"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.localVariables = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth(req, res, next) {
  var token, decodedToken, user;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers.authorization.split(" ")[1];
          _context.next = 4;
          return regeneratorRuntime.awrap(_jsonwebtoken["default"].verify(token, process.env.JWT_SECRET));

        case 4:
          decodedToken = _context.sent;
          user = req.user = decodedToken;
          res.json(decodedToken);
          next();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            err: "Unauthorised User"
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var localVariables = function localVariables(req, res, next) {
  return regeneratorRuntime.async(function localVariables$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          req.app.locals = {
            Otp: null,
            resetSession: false
          };
          next();

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.localVariables = localVariables;
var _default = auth;
exports["default"] = _default;