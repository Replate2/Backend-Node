
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("../users/user-model.js");
const { isValid } = require("../users/user-service.js");
const secretCode = require("../config/secretCode.js");

router.post("/register", (req, res) => {
    console.log('/register req.body:', req.body)
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        // hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        // save the user to the database
        Users.add(credentials)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message:
                "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    // console.log('User login request:', 'username:', username, 'password:', password)

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                // console.log(user);
                // compare the password the hash stored in the database
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = generateToken(user);

                    res.status(200).json({
                        message: "Welcome to our API",
                        token,
                    });
                } else {
                    // console.log('did not find the user:', user);
                    res.status(401).json({ message: "User is unauthorized" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message:
                "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
    };

    const secret = secretCode.jwtSecret;

    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;
