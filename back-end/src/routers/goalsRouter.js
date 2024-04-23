const express = require("express");
const auth = require("../middleware/auth")
const goalController = require("../controllers/goalController");

const goalRouter = new express.Router();

goalRouter.get("/goals", auth, goalController.getGoals);
goalRouter.get("/goals/categories", goalController.getGoalCategories);
goalRouter.get("/goals/reached",auth, goalController.getReachedGoals);
goalRouter.post("/goals",auth, goalController.addGoal);
goalRouter.put("/goals/:id",auth,  goalController.updateGoal);
goalRouter.delete("/goals/:id", auth, goalController.removeGoal);

module.exports = goalRouter;
