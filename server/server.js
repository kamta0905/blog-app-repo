require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./database/connection");
const app = express();
connection();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// set middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(cookieParser());

// check server is running or not
app.get("/", (req, res) => {
  res.status(200).send({ status: true, message: "Server is running" });
});

// set routes
app.use("/api/admin", adminRoutes);

// set user routes
app.use("/api/users", userRoutes);

// Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("That endpoint does not exist!"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send({ status: false, message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the port:${process.env.HOST}:${process.env.PORT}`);
});
