const router = require("express").Router();

const Users = require("./user-model.js");
const authenticate = require('../auth/checkpoint-mw.js');

router.get("/", authenticate, (req, res) => {
    Users.find()
        .then(users => {
            if(users) {
                res.status(200).json(users);
            } else {
                res.status(400).json({msg: 'bad requests for users'});
            }
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to get users' });
        });
});

router.get('/:id', authenticate, (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({msg: 'Could not find user with given id.'})
            }  
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to get user' });
        });
});

router.post('/:id', (req, res) => {
    Users.add(req.body)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new user' });
      });
});

router.put('/:id', checkRole(['donor', 'volunteer']), (req, res) => {
    res.status(200).json({msg:'Welcome donor or volunteer'});
});

function checkRole(roles) {
    return function (req, res, next) {
        roles.forEach(role => {
            if(role.decodedToken === role)
            next();
        })
    }
};

router.put('/:id', authenticate, (req, res) => {
    Users.findById(req.params.id)
        .update(req.body)
        .then(([updatedUser]) => {
            if(updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(400).json({msg: 'Please provide username & password for user with given id.'})
            }  
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to edit user' });
        });     
});

router.delete('/:id', authenticate, (req, res) => {
    Users.remove(req.params.id)
    .then(() => {
        res.status(201).json({msg: 'user is deleted'});
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to delete user' });
      });
});
