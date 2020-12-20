const shortCodeUrl = require("../models/shortCodeUrl");

const { nanoid } = require("nanoid");

const redirect = async (req, res) => {
  const { route: code } = req.params;
  try {
    const url = await shortCodeUrl.findOne({ code });
    if (url) {
      url.visitors++;
      url.save();
      console.log(url.visitors);
      return res.redirect(url.url);
    } else {
      return res.status(404).send({ message: "invalid url" });
    }
  } catch (error) {
    return res.status(404).send({ message: "invalid url" });
  }
};
const store = async (req, res, next) => {
  let { code } = req.body;
  try {
    if (!code) {
      code = nanoid(6);
    } else {
      const existing = await shortCodeUrl.findOne({ code });
      if (existing) {
        throw new Error("This Code already exist");
      }
    }
    const created = await shortCodeUrl.create({
      url: req.body.url,
      code: req.body.code,
    });
    res.json(created);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
const stats = async (req, res) => {
  const { route: code } = req.params;
  const visitedtUrl = await shortCodeUrl.findOne({ code });
  res.render("stats", { visitedtUrl: visitedtUrl });
};

const showIndex = async (req, res) => {
  res.render("index");
};

module.exports = { redirect, store, stats, showIndex };
