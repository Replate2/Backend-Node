"use strict";

var router = require("express").Router();

var FoodItems = require("./foodItem-model.js");

router.get("/", function (req, res) {
  FoodItems.find().then(function (foodItems) {
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
  FoodItems.findById(req.params.id).then(function (foodItem) {
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
//     FoodItems.findDonors(req.params.id)
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
//     FoodItems.findVolunteers(req.params.id)
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
  console.log(req.params.id, req.body);
  FoodItems.update(req.params.id, req.body).then(function (updateFoodItem) {
    console.log(updateFoodItem);

    if (updateFoodItem) {
      res.status(200).json(updateFoodItem);
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
  FoodItems.remove(req.params.id).then(function () {
    res.status(200).json({
      msg: 'foodItem is deleted'
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to delete foodItem'
    });
  });
});
module.exports = router;