const express = require("express");
const auth = require("../middleware/auth")
const Debtor = require("../models/debtor");
const debtorController = require("../controllers/debtorController");

const debtorRouter = new express.Router();

//api/debtors/

debtorRouter.get("/debtors", auth, debtorController.getDebtors);
debtorRouter.post("/debtors",auth, debtorController.addDebtor);
debtorRouter.put("/debtors/:id",auth,  debtorController.updateDebtor);
debtorRouter.delete("/debtors/:id", auth, debtorController.removeDebtor);

module.exports = debtorRouter;
