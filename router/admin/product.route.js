const express = require("express");
const route = express.Router();
const multer = require('multer');
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.control");
const validates = require("../../validates/admin/products.validate")

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteItem);

route.get("/create", controller.create);

route.post("/create", upload.single("thumbnail"), validates.create, controller.createPost
);


module.exports = route;