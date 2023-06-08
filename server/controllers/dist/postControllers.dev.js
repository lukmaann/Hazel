"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.likePost = exports.getUserPosts = exports.getFeedPosts = exports.createPost = void 0;

var _postModel = _interopRequireDefault(require("../models/postModel.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* CREATE */
var createPost = function createPost(req, res) {
  var _req$body, userId, description, picturePath, user, newPost, post;

  return regeneratorRuntime.async(function createPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userId = _req$body.userId, description = _req$body.description, picturePath = _req$body.picturePath;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(userId));

        case 4:
          user = _context.sent;
          newPost = new _postModel["default"]({
            userId: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: description,
            profile: user.profile,
            picturePath: picturePath,
            likes: {},
            comments: []
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(newPost.save());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_postModel["default"].find());

        case 10:
          post = _context.sent;
          res.status(201).json(post);
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          res.status(409).json({
            message: _context.t0.message
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};
/* READ */


exports.createPost = createPost;

var getFeedPosts = function getFeedPosts(req, res) {
  var post;
  return regeneratorRuntime.async(function getFeedPosts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_postModel["default"].find());

        case 3:
          post = _context2.sent;
          res.status(200).json(post);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(404).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getFeedPosts = getFeedPosts;

var getUserPosts = function getUserPosts(req, res) {
  var userId, post;
  return regeneratorRuntime.async(function getUserPosts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.params.userId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_postModel["default"].find({
            userId: userId
          }));

        case 4:
          post = _context3.sent;
          res.status(200).json(post);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(404).json({
            message: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
/* UPDATE */


exports.getUserPosts = getUserPosts;

var likePost = function likePost(req, res) {
  var id, userId, post, isLiked, updatedPost;
  return regeneratorRuntime.async(function likePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          userId = req.body.userId;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_postModel["default"].findById(id));

        case 5:
          post = _context4.sent;
          isLiked = post.likes.get(userId);

          if (isLiked) {
            post.likes["delete"](userId);
          } else {
            post.likes.set(userId, true);
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(_postModel["default"].findByIdAndUpdate(id, {
            likes: post.likes
          }, {
            "new": true
          }));

        case 10:
          updatedPost = _context4.sent;
          res.status(200).json(updatedPost);
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          res.status(404).json({
            message: _context4.t0.message
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.likePost = likePost;