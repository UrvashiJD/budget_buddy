const express = require("express");
const auth = require("../middleware/auth")
const groupExpenseController = require("../controllers/groupExpenseController");

const groupExpenseRouter = new express.Router();

groupExpenseRouter.get("/groupExpenses", auth, groupExpenseController.getGroupExpenses);
groupExpenseRouter.post("/groupExpenses", auth, groupExpenseController.addGroupExpenses);

module.exports = groupExpenseRouter;