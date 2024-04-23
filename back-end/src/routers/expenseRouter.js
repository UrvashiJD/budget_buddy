const express = require("express");
const auth = require("../middleware/auth")
const expenseController = require("../controllers/expenseController");

const expenseRouter = new express.Router();

expenseRouter.get("/expenses", auth, expenseController.getExpenses);
expenseRouter.post("/expenses", auth, expenseController.addExpense);

module.exports = expenseRouter;
