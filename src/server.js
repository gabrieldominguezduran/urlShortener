const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("./db").connect();

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});

module.exports = app;
