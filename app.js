const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for cookies and file middlewares
app.use(cookieParser());

// morgan middleware
app.use(morgan("tiny"));

// import all router here
const user = require("./routes/user");

app.use("/api", user);

// export the app js
module.exports = app;