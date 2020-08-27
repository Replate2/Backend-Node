"use strict";

var jwt = require("jsonwebtoken");

var secretCode = require("../config/secretCode.js");

var authenticate = function authenticate(req, res, next) {
  // add code here to verify users are logged in
  var token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secretCode.jwtSecret, function (error, decodedToken) {
      if (error) {
        console.log('authenticate error: ', error); // token not valid or was modified

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
  // console.log(typeof(req.params.id), typeof(req.decodedToken.id));
  // console.log(req.params.id, req.decodedToken);
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