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
const store = async (req, res) => {
  try {
    let givenCode = req.body.code;
    code = givenCode.replace(/\s/g, "");

    if (!code) {
      code = nanoid(6);
    } else if (code.length < 4 || !code.match("^[A-Za-z0-9]*$")) {
      throw new Error("Invalid code");
    } else {
      const existing = await shortCodeUrl.findOne({ code });
      if (existing) {
        throw new Error("Code already exist");
      }
    }
    await shortCodeUrl.create({
      url: req.body.url,
      code: code,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
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
