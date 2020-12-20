const shortCodeUrl = require("../models/shortCodeUrl");

const yup = require("yup");
const { nanoid } = require("nanoid");

const newUrlSchema = yup.object().shape({
  givenCode: yup
    .string()
    .trim()
    .matches(/[0-9a-zA-Z]{4,}/i),
  url: yup.string().trim().url().required(),
});

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
  let { code, url } = req.body;
  try {
    await newUrlSchema.validate({ code, url });
    if (!code) {
      code = nanoid(6);
    } else {
      const existing = await shortCodeUrl.findOne({ code });
      if (existing) {
        throw new Error("This Code already exist");
      }
    }
    const newShortCodeUrl = { code, url };
    const created = await shortCodeUrl.create(newShortCodeUrl);
    res.json(created);
  } catch (error) {
    next(error);
  }
};
const stats = async (req, res) => {
  const { route: code } = req.params;
  const visitUrl = await shortCodeUrl.findOne({ code });
  res.send({
    createdAt: visitUrl.createdAt,
    lastAccessedAt: visitUrl.updatedAt,
    visitors: visitUrl.visitors,
  });
};

module.exports = { redirect, store, stats };
