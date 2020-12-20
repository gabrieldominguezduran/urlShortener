const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
module.exports = { connect };
