"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRemoveFriend = exports.getUserFriends = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* READ */
var getUserFriends = function getUserFriends(req, res) {
  var id, user, friends, formattedFriends;
  return regeneratorRuntime.async(function getUserFriends$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.params.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(id));

        case 4:
          user = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(Promise.all(user.friends.map(function (id) {
            return _userModel["default"].findById(id);
          })));

        case 7:
          friends = _context.sent;
          formattedFriends = friends.map(function (_ref) {
            var _id = _ref._id,
                firstName = _ref.firstName,
                lastName = _ref.lastName,
                occupation = _ref.occupation,
                location = _ref.location,
                picturePath = _ref.picturePath;
            return {
              _id: _id,
              firstName: firstName,
              lastName: lastName,
              occupation: occupation,
              location: location,
              picturePath: picturePath
            };
          });
          res.status(200).json(formattedFriends);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: _context.t0.message
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};
/* UPDATE */


exports.getUserFriends = getUserFriends;

var addRemoveFriend = function addRemoveFriend(req, res) {
  var _req$params, id, friendId, user, friend, friends, formattedFriends;

  return regeneratorRuntime.async(function addRemoveFriend$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$params = req.params, id = _req$params.id, friendId = _req$params.friendId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(id));

        case 4:
          user = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_userModel["default"].findById(friendId));

        case 7:
          friend = _context2.sent;

          if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(function (id) {
              return id !== friendId;
            });
            friend.friends = friend.friends.filter(function (id) {
              return id !== id;
            });
          } else {
            user.friends.push(friendId);
            friend.friends.push(id);
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(friend.save());

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(Promise.all(user.friends.map(function (id) {
            return _userModel["default"].findById(id);
          })));

        case 15:
          friends = _context2.sent;
          formattedFriends = friends.map(function (_ref2) {
            var _id = _ref2._id,
                firstName = _ref2.firstName,
                lastName = _ref2.lastName,
                address = _ref2.address,
                profile = _ref2.profile;
            return {
              _id: _id,
              firstName: firstName,
              lastName: lastName,
              address: address,
              profile: profile
            };
          });
          res.status(200).json(formattedFriends);
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          res.status(404).json({
            message: _context2.t0.message
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.addRemoveFriend = addRemoveFriend;