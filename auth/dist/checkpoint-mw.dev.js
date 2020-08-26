"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var jwt = require("jsonwebtoken");

var secretCode = require("../config/secretCode.js");

var authenticate = function authenticate(req, res, next) {
  // add code here to verify users are logged in
  var token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secretCode.jwtSecret, function (error, decodedToken) {
      if (error) {
        // token not valid or was modified
        res.status(401).json({
          you: "shall not pass!"
        });
      } else {
        // token is good and we have access to the information inside
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Please provide credentials"
    });
  }
};

var checkUserIdMatch = function checkUserIdMatch(req, res, next) {
  console.log(_typeof(req.params.id), _typeof(req.decodedToken.id));
  console.log(req.params.id, req.decodedToken);

  if (req.decodedToken.id && req.decodedToken.id == req.params.id) {
    next();
  } else {
    res.status(401).json({
      message: "No access to other user id"
    });
  }
};

module.exports = {
  authenticate: authenticate,
  checkUserIdMatch: checkUserIdMatch
};