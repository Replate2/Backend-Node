"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var bcryptjs = require("bcryptjs");

var jwt = require("jsonwebtoken");

var router = require("express").Router();

var Users = require("../users/user-model.js");

var _require = require("../users/user-service.js"),
    isValid = _require.isValid;

var secretCode = require("../config/secretCode.js");

router.post("/register", function (req, res) {
  var credentials = req.body;

  if (isValid(credentials)) {
    var rounds = process.env.BCRYPT_ROUNDS || 8; // hash the password

    var hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash; // save the user to the database

    Users.add(credentials).then(function (user) {
      res.status(201).json({
        data: user
      });
    })["catch"](function (error) {
      res.status(500).json({
        message: error.message
      });
    });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric"
    });
  }
});
router.post("/login", function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  if (isValid(req.body)) {
    Users.findBy({
      username: username
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          user = _ref2[0];

      console.log(user); // compare the password the hash stored in the database

      if (user && bcryptjs.compareSync(password, user.password)) {
        var token = generateToken(user);
        res.status(200).json({
          message: "Welcome to our API",
          token: token
        });
      } else {
        res.status(401).json({
          message: "User is unauthorized"
        });
      }
    })["catch"](function (error) {
      res.status(500).json({
        message: error.message
      });
    });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric"
    });
  }
});

function generateToken(user) {
  var payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };
  var secret = secretCode.jwtSecret;
  var options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;