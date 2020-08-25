"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = require("express").Router();

var Users = require("./user-model.js");

var authenticate = require('./checkpoint-mw.js');

router.get("/", authenticate, function (req, res) {
  Users.find().then(function (users) {
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json({
        msg: 'bad requests for users'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get users'
    });
  });
});
router.get('/:id', authenticate, function (req, res) {
  Users.findById(req.params.id).then(function (user) {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        msg: 'Could not find user with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get user'
    });
  });
});
router.post('/:id', function (req, res) {
  Users.add(req.body).then(function (newUser) {
    res.status(201).json(newUser);
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to create new user'
    });
  });
});
router.put('/:id', checkRole(['donor', 'volunteer']), function (req, res) {
  res.status(200).json({
    msg: 'Welcome donor or volunteer'
  });
});

function checkRole(roles) {
  return function (req, res, next) {
    roles.forEach(function (role) {
      if (role.decodedToken === role) next();
    });
  };
}

;
router.put('/:id', authenticate, function (req, res) {
  Users.findById(req.params.id).update(req.body).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        updatedUser = _ref2[0];

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({
        msg: 'Please provide username & password for user with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to edit user'
    });
  });
});
router["delete"]('/:id', authenticate, function (req, res) {
  Users.remove(req.params.id).then(function () {
    res.status(201).json({
      msg: 'user is deleted'
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to delete user'
    });
  });
});