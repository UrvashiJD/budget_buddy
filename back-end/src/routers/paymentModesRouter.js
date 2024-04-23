const express = require("express");
const auth = require("../middleware/auth")
const paymentController = require("../controllers/paymentModeController");

const paymentModeRouter = new express.Router();

paymentModeRouter.get("/paymentModes", auth, paymentController.getPaymentModes);

module.exports = paymentModeRouter;
