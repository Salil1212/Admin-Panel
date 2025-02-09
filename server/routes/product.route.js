const express = require("express");
const controller = require("../controllers/product.controller.js");
const {validate} =require("express-validation");
const { productImageUpload } = require("../middlewares/product.middleware.js");
const router = express.Router();
router.route('/')
.get(controller.getProductsList)
.post(productImageUpload,controller.createProduct);


module.exports = router