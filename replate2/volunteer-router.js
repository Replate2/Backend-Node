const router = require("express").Router();
const Foods = require('../data/connection.js');
const Users = require("../users/user-model.js");

router.get("/", (req, res) => {
    Users.findVolunteers()
        .then(volunteers => {
            if(volunteers) {
                res.status(200).json(volunteers);
            } else {
                res.status(400).json({msg: 'bad requests for volunteers'});
            }
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to get volunteers' });
        });
});

router.get('/:id', (req, res) => {
    Users.findVolunteerById(req.params.id)
        .then(volunteer => {
            if(volunteer) {
                res.status(200).json(volunteer);
            } else {
                res.status(404).json({msg: 'Could not find volunteer with given id.'})
            }  
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to get volunteer' });
        });
});

router.get('/:id/foodItems', (req, res) => {
    Users.findFooditems(req.params.id)
    .then(foods => {
        if(foods) {
            res.status(200).json(foods);
        } else {
            res.status(404).json({msg: 'Could not get foods'})
        }  
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get foods' });
    });
});

router.post('/:id/foodItems', (req, res) => {
    Volunteers.findById(req.params.id)
        .then(volunteer => {
            if(volunteer) {
                Foods.insert(req.body);
            } else {
                res.status(400).json({msg: 'Please provide volunteer information'})
            }
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to add foodItems' });
        });
});

router.put('/:id', (req, res) => {
    Users
        .update(req.params.id, req.body)
        .then((updatedVolunteer) => {
            if(updatedVolunteer) {
                res.status(200).json(updatedVolunteer);
            } else {
                res.status(400).json({msg: 'Please provide volunteer username & password with given id.'})
            }  
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to edit volunteer' });
        });     
});

router.put('/:id/foodItems/:foodId', (req, res) => {
    const pickupTime = req.body.pickupTime;
    Users.updateTime(req.params.id, pickupTime)
    .then((vdf) => {
        console.log(vdf);
        res.status(200).json(vdf);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to edit pickup time' });
    });     
});

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(() => {
        res.status(201).json({msg: 'volunteer is deleted'});
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to delete volunteer' });
      });
});

module.exports = router;
