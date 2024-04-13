const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validates = require("../../validates/admin/accounts.validate");
const controller = require("../../controllers/admin/account.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.get("/create", controller.create);

router.post("/create",
  upload.single("avata"),
  uploadCloud.upload,
  validates.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
  upload.single("avata"),
  uploadCloud.upload,
  validates.editPatch,
  controller.editPatch);

module.exports = router