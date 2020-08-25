const router = require("express").Router();

const Donors = require("./donor-model.js");

router.get("/", (req, res) => {
    Donors.find()
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
    Donors.findById(req.params.id)
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
    Donors.findFooditems()
    .then(foods => {
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

router.post('/:id', (req, res) => {
    Donors.add(req.body)
    .then(newDonor => {
        res.status(201).json(newDonor);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new donor' });
      });
});

// router.put('/:id', checkRole(['donor', 'volunteer']), (req, res) => {
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

router.put('/:id', (req, res) => {
    Donors.findById(req.params.id)
        .update(req.body)
        .then(([updateDonor]) => {
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
    Donors.remove(req.params.id)
    .then(() => {
        res.status(201).json({msg: 'donor is deleted'});
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to delete donor' });
      });
});
