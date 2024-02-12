const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/product.control");

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus)

module.exports = route;