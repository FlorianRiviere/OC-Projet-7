const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: "config/.env" });

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();

mongoose
  .connect(process.env.SECRET_MDB)
  .then(() => {
    console.log("Connexion to MongoDB succeeded");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/public", express.static(path.join(__dirname, "public")));

module.exports = app;
