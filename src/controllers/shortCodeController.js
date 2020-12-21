const shortCodeUrl = require("../models/shortCodeUrl");

const { nanoid } = require("nanoid");

const redirect = async (req, res) => {
  const { route: code } = req.params;
  try {
    const url = await shortCodeUrl.findOne({ code });
    if (url) {
      url.visitors++;
      url.save();

      return res.redirect(url.url);
    } else {
      return res.status(404).send({ message: "invalid url" });
    }
  } catch (error) {
    return res.status(404).send({ message: "invalid url" });
  }
};
const store = async (req, res, next) => {
  try {
    let givenCode = req.body.code;
    code = givenCode.replace(/\s/g, "");
    if (!code) {
      code = nanoid(6);
    } else if (code.length < 4) {
      throw new Error("Code must be at least 4 characters");
    } else {
      const existing = await shortCodeUrl.findOne({ code });
      if (existing) {
        throw new Error("This Code already exist");
      }
    }
    await shortCodeUrl.create({
      url: req.body.url,
      code: code,
    });
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
  const getData = await shortCodeUrl.find();
  res.render("index", { getData: getData });
};

module.exports = { redirect, store, stats, showIndex };
