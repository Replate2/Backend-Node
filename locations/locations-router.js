const router = require("express").Router();
const Locations = require("./locations-model");

router.get("/", (req, res) => {
  Locations.find()
    .then((locations) => res.json({ locations }).end())
    .catch((error) => res.status(500).json({ error: error.message }).end());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Locations.findBy({ id })
    .then((location) => res.json({ location }).end())
    .catch((error) => res.status(500).json({ error: error.message }).end());
});

module.exports = router;
