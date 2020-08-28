"use strict";

var router = require("express").Router();

var Foods = require('../data/connection.js');

var Users = require("../users/user-model.js");

router.get("/", function (req, res) {
  Users.findDonors().then(function (donors) {
    if (donors) {
      res.status(200).json(donors);
    } else {
      res.status(400).json({
        msg: 'bad requests for donors'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get donors'
    });
  });
});
router.get('/:id', function (req, res) {
  Users.findDonorById(req.params.id).then(function (donor) {
    if (donor) {
      res.status(200).json(donor);
    } else {
      res.status(404).json({
        msg: 'Could not find donor with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get donor'
    });
  });
});
router.get('/:id/foodItems', function (req, res) {
  Users.findFooditems(req.params.id).then(function (foods) {
    if (foods) {
      res.status(200).json(foods);
    } else {
      res.status(404).json({
        msg: 'Could not find foods'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get foods'
    });
  });
});
router.post('/:id/foodItems', function (req, res) {
  Donors.findById(req.params.id).then(function (donor) {
    if (donor) {
      Foods.insert(req.body);
    } else {
      res.status(400).json({
        msg: 'Please provide donor information'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to add foodItems'
    });
  });
});
router.put('/:id', function (req, res) {
  Users.updateDonor(req.params.id, req.body).then(function (updateDonor) {
    console.log(updateDonor);

    if (updateDonor) {
      res.status(200).json(updateDonor);
    } else {
      res.status(400).json({
        msg: 'Please provide donor username & password for donor with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to edit donor'
    });
  });
});
router["delete"]('/:id', function (req, res) {
  Users.remove(req.params.id).then(function () {
    res.status(200).json({
      msg: 'donor is deleted'
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to delete donor'
    });
  });
});
module.exports = router;