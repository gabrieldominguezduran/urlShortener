const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Index page");
});

router.get("/:route", (req, res) => {});

router.get("/:route/stats", (req, res) => {});

router.post("/url", (req, res) => {});

module.exports = router;
