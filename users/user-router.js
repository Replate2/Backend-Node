const router = require("express").Router();

const Users = require("./user-model.js");
// const Foods = require('../replate2/fooditem-model.js');
const {
    authenticate,
    checkUserIdMatch
} = require('../auth/checkpoint-mw.js');

router.get("/", authenticate, (req, res) => {
    Users.find()
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(400).json({
                    msg: 'bad requests for users'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to get users'
            });
        });
});

router.get('/:id', authenticate, (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    msg: 'Could not find user with given id.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to get user'
            });
        });
});

router.post('/:id', authenticate, checkUserIdMatch, (req, res) => {
    Users.add(req.body)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new user'
            });
        });
});

router.post('/:id/foodItems', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            console.log(user);
            if (user) {
                Users.addFood(req.body, req.params.id)
                    .then(food => {
                        console.log(food);
                        res.status(201).json(food);
                    })
                    .catch(err => {
                        res.status(500).json({
                            err: 'Failed to add foodItems'
                        });
                    });
            } else {
                res.status(400).json({
                    msg: 'Please provide user information'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to add foodItems'
            });
        });
});

router.put('/:id', authenticate, checkUserIdMatch, (req, res) => {
    console.log(req.params.id, req.body);
    Users.update(req.params.id, req.body)
        .then((updatedUser) => {
            console.log(updatedUser)
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(400).json({
                    msg: 'Please provide username & password for user with given id.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to edit user'
            });
        });
});

router.delete('/:id', authenticate, checkUserIdMatch, (req, res) => {
    console.log('delete request', req.params.id);
    Users.remove(req.params.id, req.headers.authorization)
        .then(() => {
            res.status(201).json({
                msg: 'user is deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to delete user'
            });
        });
});

module.exports = router;