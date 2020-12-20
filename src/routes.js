const router = require("express").Router();

const shortUrlCodeController = require("./controllers/shortCodeController");

router.get("/", (req, res) => {
  res.send("Index page");
});

router.get("/:route", shortUrlCodeController.redirect);

router.get("/:route/stats", shortUrlCodeController.stats);

router.post("/url", shortUrlCodeController.store);

module.exports = router;
