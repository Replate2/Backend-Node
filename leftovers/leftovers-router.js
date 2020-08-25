const router = require("express").Router();
const Leftovers = require("./leftovers-model");

router.get("/", (req, res) => {
  Leftovers.find()
    .then((leftovers) => res.json({ leftovers }).end())
    .catch((error) => res.status(500).json({ error: error.message }).end());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Leftovers.findBy({ id })
    .then((leftovers) => res.json({ leftovers }).end())
    .catch((error) => res.status(500).json({ error: error.message }).end());
});

module.exports = router;
