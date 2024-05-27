const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const sui8192Routes = require("./routes/sui8192");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/suiga";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

//helpers
app.use(helmet());
app.use(compression());

app.use("/sui8192", sui8192Routes);

//

app.use((error, req, res, next) => {
  const cleanedMessage = error.message.replace(/\\x1b\[\d+m/g, "");

  console.log(cleanedMessage);
  const status = error.statusCode;
  const message = error.message.toString().trim();
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 20000 })
  .then((result) => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(8888, () => {
  console.log("Server is running on : 8888");
});
module.exports = app;
