"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = require("express").Router();

var Foods = require('../data/connection.js');

var Users = require("../users/user-model.js");

router.get("/", function (req, res) {
  Users.findVolunteers().then(function (volunteers) {
    if (volunteers) {
      res.status(200).json(volunteers);
    } else {
      res.status(400).json({
        msg: 'bad requests for volunteers'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get volunteers'
    });
  });
});
router.get('/:id', function (req, res) {
  Volunteers.findById(req.params.id).then(function (volunteer) {
    if (volunteer) {
      res.status(200).json(volunteer);
    } else {
      res.status(404).json({
        msg: 'Could not find volunteer with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get volunteer'
    });
  });
});
router.get('/:id/foodItems', function (req, res) {
  Volunteers.findFooditems(req.params.id).then(function (foods) {
    if (foods) {
      res.status(200).json(foods);
    } else {
      res.status(404).json({
        msg: 'Could not get foods'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get foods'
    });
  });
});
router.post('/:id/foodItems', function (req, res) {
  Volunteers.findById(req.params.id).then(function (volunteer) {
    if (volunteer) {
      Foods.insert(req.body);
    } else {
      res.status(400).json({
        msg: 'Please provide volunteer information'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to add foodItems'
    });
  });
});
router.put('/:id', function (req, res) {
  Volunteers.findById(req.params.id).update(req.body).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        updatedVolunteer = _ref2[0];

    if (updatedVolunteer) {
      res.status(200).json(updatedVolunteer);
    } else {
      res.status(400).json({
        msg: 'Please provide volunteer username & password with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to edit volunteer'
    });
  });
});
router["delete"]('/:id', function (req, res) {
  Volunteers.remove(req.params.id).then(function () {
    res.status(201).json({
      msg: 'volunteer is deleted'
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to delete volunteer'
    });
  });
});
module.exports = router;