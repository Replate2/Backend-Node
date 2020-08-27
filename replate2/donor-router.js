const router = require("express").Router();
const Foods = require('../data/connection.js');
const Users = require("../users/user-model.js");

router.get("/", (req, res) => {
    Users.findDonors()
        .then(donors => {
            if(donors) {
                res.status(200).json(donors);
            } else {
                res.status(400).json({msg: 'bad requests for donors'});
            }
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to get donors' });
        });
});

router.get('/:id', (req, res) => {
    Users.findDonorById(req.params.id)
        .then(donor => {
            if(donor) {
                res.status(200).json(donor);
            } else {
                res.status(404).json({msg: 'Could not find donor with given id.'})
            }  
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to get donor' });
        });
});

router.get('/:id/foodItems', (req, res) => {
    Users.findFooditems(req.params.id)
    .then((foods) => {
        if(foods) {
            res.status(200).json(foods);
        } else {
            res.status(404).json({msg: 'Could not find foods'})
        }  
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get foods' });
    });
});

router.post('/:id/foodItems', (req, res) => {
    Donors.findById(req.params.id)
        .then(donor => {
            if(donor) {
                Foods.insert(req.body);
            } else {
                res.status(400).json({msg: 'Please provide donor information'})
            }
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to add foodItems' });
        });
});

router.put('/:id', (req, res) => {
    Users
        .updateDonor(req.params.id, req.body)
        .then((updateDonor) => {
            console.log(updateDonor)
            if(updateDonor) {
                res.status(200).json(updateDonor);
            } else {
                res.status(400).json({msg: 'Please provide donor username & password for donor with given id.'})
            }  
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to edit donor' });
        });     
});

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(() => {
        res.status(201).json({msg: 'donor is deleted'});
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to delete donor' });
      });
});

module.exports = router;
