const express = require("express")
const controller = require("../controllers/payment.controller.js")
const router = express.Router()



router.route("/options").get(controller.paymentOption)
.post(controller.postPaymentOption);

// Route to intialize payment
router.route("/intialize").post(controller.prePayment)

module.exports = router