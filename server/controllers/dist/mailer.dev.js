"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMail = void 0;

var _mailgen = _interopRequireDefault(require("mailgen"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var nodeConfig = {
  // host: "smtp.ethereal.email",
  // port: 587,
  service: "Gmail",
  secure: false,
  // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    // generated ethereal user
    pass: process.env.PASSWORD // generated ethereal password

  }
};

var transporter = _nodemailer["default"].createTransport(nodeConfig);

var mailGenerator = new _mailgen["default"]({
  theme: "default",
  product: {
    name: "Hazel",
    link: "https://lukmaanbhai.com/"
  }
});

var registerMail = function registerMail(req, res) {
  var _req$body, username, userEmail, text, subject, email, emailBody, message;

  return regeneratorRuntime.async(function registerMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, userEmail = _req$body.userEmail, text = _req$body.text, subject = _req$body.subject;
          email = {
            body: {
              name: username,
              intro: text || "Welcome to Hazel",
              outro: "thanks for joining us"
            }
          };
          emailBody = mailGenerator.generate(email);
          message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: subject || "welcome",
            html: emailBody
          };
          transporter.sendMail(message).then(function () {
            res.status(200).send({
              msg: "Check your email please"
            });
          })["catch"](function (error) {
            return res.status(500).send({
              error: error
            });
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.registerMail = registerMail;