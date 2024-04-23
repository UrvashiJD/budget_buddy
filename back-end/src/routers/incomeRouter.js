const express = require("express");
const auth = require("../middleware/auth")
const incomeController = require("../controllers/incomeController");

const incomeRouter = new express.Router();

incomeRouter.get("/incomes", auth, incomeController.getIncomes);
incomeRouter.post("/incomes", auth, incomeController.addIncome);

module.exports = incomeRouter;
