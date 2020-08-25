"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = require("express").Router();

var Donors = require("./donor-model.js");

router.get("/", function (req, res) {
  Donors.find().then(function (donors) {
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
  Donors.findById(req.params.id).then(function (donor) {
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
  Donors.findFooditems().then(function (foods) {
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
router.post('/:id', function (req, res) {
  Donors.add(req.body).then(function (newDonor) {
    res.status(201).json(newDonor);
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to create new donor'
    });
  });
}); // router.put('/:id', checkRole(['donor', 'volunteer']), (req, res) => {
//     res.status(200).json({msg:'Welcome donor or volunteer'});
// });
// function checkRole(roles) {
//     return function (req, res, next) {
//         roles.forEach(role => {
//             if(role.decodedToken === role)
//             next();
//         })
//     }
// };

router.put('/:id', function (req, res) {
  Donors.findById(req.params.id).update(req.body).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        updateDonor = _ref2[0];

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
  Donors.remove(req.params.id).then(function () {
    res.status(201).json({
      msg: 'donor is deleted'
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to delete donor'
    });
  });
});