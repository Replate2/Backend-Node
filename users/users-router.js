const router = require("express").Router();
const Users = require("./users-model");
const protect = require("../auth/authenticate-middleware");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.json({ users }).end())
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params.id;
  Users.findBy({ id })
    .then((user) => res.json({ user }).end())
    .catch((error) => res.status(500).json({ error: error.message }).end());
});

router.post("/", protect, (req, res) => {
  Users.add(req.body)
    .then((message) => res.json({ message }).end())
    .catch((error) => res.status(500).json({ error: message }).end());
});

module.exports = router;
