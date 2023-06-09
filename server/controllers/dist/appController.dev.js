"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.createResetSession = exports.updateUser = exports.getUser = exports.verifyOTP = exports.generateOTP = exports.login = exports.register = exports.verifyUser = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var bcrypt = _interopRequireWildcard(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _otpGenerator = _interopRequireDefault(require("otp-generator"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// ------------------------------verify user---------------------
var verifyUser = function verifyUser(req, res, next) {
  var _ref, username, userExists;

  return regeneratorRuntime.async(function verifyUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref = req.method == "GET" ? req.query : req.body, username = _ref.username;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            username: username
          }));

        case 4:
          userExists = _context.sent;

          if (userExists) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).send({
            err: "User Not Found!!"
          }));

        case 7:
          next();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(404).send({
            err: "Authentication Error"
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}; //---------------register user------------------


exports.verifyUser = verifyUser;

var register = function register(req, res) {
  var _req$body, username, password, email, profile, existsUser, existsEmail;

  return regeneratorRuntime.async(function register$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email, profile = _req$body.profile; // -----------check the user exists in db-----------

            existsUser = new Promise(function (resolve, reject) {
              _userModel["default"].findOne({
                username: username
              }).then(function (user) {
                if (user) reject(new Error("username already exists"));
                resolve();
              })["catch"](function (err) {
                reject("error");
              });
            });
            existsEmail = new Promise(function (resolve, reject) {
              _userModel["default"].findOne({
                email: email
              }).then(function (email) {
                if (email) reject(new Error("email already exists"));
                resolve();
              })["catch"](function (err) {
                reject("error");
              });
            });
            Promise.all([existsEmail, existsUser]).then(function () {
              if (password) {
                bcrypt.hash(password, 10).then(function (hashedPassword) {
                  var user = new _userModel["default"]({
                    username: username,
                    password: hashedPassword,
                    profile: profile || "",
                    email: email
                  });
                  user.save().then(function () {
                    return res.status(201).send("user saved");
                  })["catch"](function (err) {
                    return res.status(500).send(err);
                  });
                })["catch"](function (err) {
                  return res.status(500).send({
                    err: "unable to hash password"
                  });
                });
              }
            })["catch"](function (err) {
              res.send({
                errors: err
              });
            });
          } catch (error) {
            res.status(500).send({
              err: error
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // --------------------login---------------------


exports.register = register;

var login = function login(req, res) {
  var _req$body2, username, password;

  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;

          try {
            _userModel["default"].findOne({
              username: username
            }).then(function (user) {
              bcrypt.compare(password, user.password).then(function (match) {
                if (!match) {
                  return res.status(400).send({
                    err: "Invalid password"
                  });
                } else {
                  // --------------------create token------------------------
                  var payload = {
                    userId: user._id,
                    username: user.username
                  };
                  var secret = process.env.JWT_SECRET;
                  var expiry = {
                    expiresIn: "24h"
                  };

                  var token = _jsonwebtoken["default"].sign(payload, secret, expiry);

                  return res.status(200).send({
                    msg: "Login Succefull",
                    username: user.username,
                    token: token
                  });
                }
              });
            })["catch"](function (err) {
              res.status(404).send({
                err: "User Not Found"
              });
            });
          } catch (error) {
            res.status(500).send({
              err: "login error"
            });
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // --------------------------generate OTP--------------


exports.login = login;

var generateOTP = function generateOTP(req, res) {
  return regeneratorRuntime.async(function generateOTP$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_otpGenerator["default"].generate(6, {
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false
          }));

        case 2:
          req.app.locals.Otp = _context4.sent;
          res.status(201).send({
            code: req.app.locals.Otp
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // -----------------------------verify OTP---------------


exports.generateOTP = generateOTP;

var verifyOTP = function verifyOTP(req, res) {
  var code;
  return regeneratorRuntime.async(function verifyOTP$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          code = req.query.code;

          if (!(parseInt(code) === parseInt(req.app.locals.Otp))) {
            _context5.next = 5;
            break;
          }

          res.app.locals.Otp = null;
          res.app.locals.resetSession = true;
          return _context5.abrupt("return", res.status(201).send({
            msg: "Verified Succefully..."
          }));

        case 5:
          return _context5.abrupt("return", res.status(400).send({
            err: "Invalid Otp"
          }));

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // --------------------------------getUser----------------


exports.verifyOTP = verifyOTP;

var getUser = function getUser(req, res) {
  var username;
  return regeneratorRuntime.async(function getUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          username = req.params.username;
          _context6.prev = 1;

          if (username) {
            _context6.next = 4;
            break;
          }

          return _context6.abrupt("return", res.status(501).send("Invalid username"));

        case 4:
          _userModel["default"].findOne({
            username: username
          }).then(function (user) {
            if (!user) return res.status(501).send("cannot find user");

            var _Object$assign = Object.assign({}, user.toJSON()),
                password = _Object$assign.password,
                rest = _objectWithoutProperties(_Object$assign, ["password"]);

            res.status(200).send(rest);
          })["catch"](function (err) {
            res.status(501).send({
              err: err
            });
          });

          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", res.status(501).send("connot find user"));

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 7]]);
}; // -------------------------------updateUser-------------


exports.getUser = getUser;

var updateUser = function updateUser(req, res) {
  var userId, body;
  return regeneratorRuntime.async(function updateUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          userId = req.user.userId;
          _context7.prev = 1;

          if (!userId) {
            _context7.next = 7;
            break;
          }

          body = req.body;

          _userModel["default"].updateOne({
            _id: userId
          }, body).then(function () {
            res.status(201);
          });

          _context7.next = 8;
          break;

        case 7:
          return _context7.abrupt("return", res.status(401).send({
            err: "user not Found"
          }));

        case 8:
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", res.status(401).send({
            err: "user not Found"
          }));

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 10]]);
}; // -----------------------------redirect user to reset password when otp is correct


exports.updateUser = updateUser;

var createResetSession = function createResetSession(Req, res) {
  return regeneratorRuntime.async(function createResetSession$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!req.app.locals.resetSession) {
            _context8.next = 3;
            break;
          }

          req.app.locals.resetSession = false; // allow access to this route only once

          return _context8.abrupt("return", res.status(201).send({
            msg: "access granted"
          }));

        case 3:
          return _context8.abrupt("return", res.status(440).send("session expired"));

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}; // --------------------------------------resetPassword----------------------


exports.createResetSession = createResetSession;

var resetPassword = function resetPassword(req, res) {
  var _req$body3, username, password;

  return regeneratorRuntime.async(function resetPassword$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;

          if (res.app.locals.resetSession) {
            _context9.next = 3;
            break;
          }

          return _context9.abrupt("return", res.status(440).send({
            err: "session expired!!"
          }));

        case 3:
          _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;
          _context9.prev = 4;

          _userModel["default"].findOne({
            username: username
          }).then(function (user) {
            bcrypt.hash(password, 10).then(function (hashedPassword) {
              _userModel["default"].updateOne({
                username: user.username
              }, {
                password: hashedPassword
              }).then(function () {
                res.status(201).send({
                  msg: "updated succeffully..."
                });
              })["catch"](function (e) {
                return res.status(400).send({
                  err: "Unable to update password"
                });
              });
            })["catch"](function (err) {
              return res.status(440).send({
                err: "unable to hash the password"
              });
            });
          })["catch"](function (e) {
            return res.status(404).send({
              err: "user not Found"
            });
          });

          _context9.next = 11;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](4);
          return _context9.abrupt("return", res.status(401).send({
            error: _context9.t0
          }));

        case 11:
          _context9.next = 16;
          break;

        case 13:
          _context9.prev = 13;
          _context9.t1 = _context9["catch"](0);
          return _context9.abrupt("return", res.status(401).send({
            err: "Unauthorised"
          }));

        case 16:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 13], [4, 8]]);
};

exports.resetPassword = resetPassword;