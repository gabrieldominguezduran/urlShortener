const mongoose = require("mongoose");
const shortCodetUrlSchema = mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    visitors: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("shortCodetUrl", shortCodetUrlSchema);
