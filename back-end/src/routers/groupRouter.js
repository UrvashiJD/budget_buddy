const express = require("express");
const auth = require("../middleware/auth")
const groupController = require("../controllers/groupController");

const groupRouter = new express.Router();

groupRouter.get("/groups", auth, groupController.getGroups);
groupRouter.post("/groups", auth, groupController.addGroup);

module.exports = groupRouter;
