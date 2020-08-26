"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = require("express").Router();

var Fooditems = require("./fooditem-model.js");

router.get("/", function (req, res) {
  Fooditems.find().then(function (foodItems) {
    if (foodItems) {
      res.status(200).json(foodItems);
    } else {
      res.status(400).json({
        msg: 'bad requests for foodItems'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get foodItems'
    });
  });
});
router.get('/:id', function (req, res) {
  Fooditems.findById(req.params.id).then(function (foodItem) {
    if (foodItem) {
      res.status(200).json(foodItem);
    } else {
      res.status(404).json({
        msg: 'Could not find foodItem with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to get foodItem'
    });
  });
}); // router.get('/:id/donors', (req, res) => {
//     Fooditems.findDonors(req.params.id)
//     .then(donors => {
//         if(donors) {
//             res.status(200).json(donors);
//         } else {
//             res.status(404).json({msg: 'Could not find donors'})
//         }  
//     })
//     .catch(err => {
//         res.status(500).json({err: 'Failed to get donors' });
//     });
// });
// router.get('/:id/volunteers', (req, res) => {
//     Fooditems.findVolunteers(req.params.id)
//     .then(volunteers => {
//         if(volunteers) {
//             res.status(200).json(volunteers);
//         } else {
//             res.status(404).json({msg: 'Could not find volunteers'})
//         }  
//     })
//     .catch(err => {
//         res.status(500).json({err: 'Failed to get volunteers' });
//     });
// });

router.put('/:id', function (req, res) {
  Fooditems.findById(req.params.id).update(req.body).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        updateFooditem = _ref2[0];

    if (updateFooditem) {
      res.status(200).json(updateFooditem);
    } else {
      res.status(400).json({
        msg: 'Please provide foodItem info with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: 'Failed to edit foodItem'
    });
  });
});
router["delete"]('/:id', function (req, res) {
  Fooditems.remove(req.params.id).then(function () {
    res.status(201).json({
      msg: 'foodItem is deleted'
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to delete foodItem'
    });
  });
});
module.exports = router;