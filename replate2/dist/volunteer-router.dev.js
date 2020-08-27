"use strict";

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
  Users.findVolunteerById(req.params.id).then(function (volunteer) {
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
  Users.findFooditems(req.params.id).then(function (foods) {
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
  Users.update(req.params.id, req.body).then(function (updatedVolunteer) {
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
router.put('/:id/foodItems/:foodId', function (req, res) {
  var pickupTime = req.body.pickupTime;
  Users.updateTime(req.params.id, pickupTime).then(function (vdf) {
    console.log(vdf);
    res.status(200).json(vdf);
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to edit pickup time'
    });
  });
});
router["delete"]('/:id', function (req, res) {
  Users.remove(req.params.id).then(function () {
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