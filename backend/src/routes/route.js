const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const blogrout = require("./blog.route");

routes.use("/user", userRoute);
routes.use("/blog", blogrout)

module.exports = routes;
