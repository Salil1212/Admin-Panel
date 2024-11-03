const express = require("express");
const controller = require("../controllers/product.controller.js");
const {validate} =require("express-validation");
const router = express.Router();

router.route('/')
.get(controller.getProductsList)



module.exports = router