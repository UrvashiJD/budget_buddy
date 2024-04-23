const express = require("express");
const auth = require("../middleware/auth")
const creditorController = require("../controllers/creditorController");

const creditorRouter = new express.Router();

creditorRouter.get("/creditors", auth, creditorController.getCreditors);
creditorRouter.post("/creditors",auth, creditorController.addCreditor);
creditorRouter.put("/creditors/:id",auth,  creditorController.updateCreditor);
creditorRouter.delete("/creditors/:id", auth, creditorController.removeCreditor);
creditorRouter.get("/creditors/stats", creditorController.getCreditorStats);

module.exports = creditorRouter;
