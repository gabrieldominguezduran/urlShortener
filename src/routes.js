const router = require("express").Router();

const shortUrlCodeController = require("./controllers/shortCodeController");

router.get("/", shortUrlCodeController.showIndex);

router.get("/:route", shortUrlCodeController.redirect);

router.get("/:route/stats", shortUrlCodeController.stats);

router.post("/getUrl", shortUrlCodeController.store);

module.exports = router;
