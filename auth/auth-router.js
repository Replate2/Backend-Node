const router = require("express").Router();
const Auth = require("./auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../constants/secret");

router.post("/register", (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(
    credentials.password,
    process.env.BCRYPT_ROUNDS || 8
  );
  credentials.password = hash;

  Auth.add(credentials)
    .then((message) => res.status(201).json({ message }).end())
    .catch(() =>
      res
        .status(500)
        .json({
          error:
            "Bad registration data, it may be a duplicate, or incorrect creds.",
        })
        .end()
    );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Auth.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.json({ message: "Sign in successful!", token });
      } else {
        res.status(401).json({ error: "Bad credentials!" }).end();
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }).end());
});

module.exports = router;

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}
