const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const transactionController = require("../controllers/transactionController");

const transactionRouter = new express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1000000, //1MB
  // },
  fileFilter(req, file, callback) {
    if (
      file.originalname.endsWith(".jpg") ||
      file.originalname.endsWith(".jpeg") ||
      file.originalname.endsWith(".png")
    ) {
      return callback(undefined, true);
    }
    return callback(
      new Error("Please upload file with .jpg,.jpeg,or .png format")
    );
  },
});

transactionRouter.get(
  "/transactions",
  auth,
  transactionController.getTransactions
);

transactionRouter.post(
  "/transactions",
  auth,
  transactionController.addTransaction
);

transactionRouter.post(
  "/transactions/:id/billsrc",
  auth,
  upload.single("bill"),
  transactionController.addBillSrcToTransaction,
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

transactionRouter.get("/transactions/:id/billsrc",transactionController.getTransactionBill);

//pass transaction billsrc as body

transactionRouter.delete("/transactions/:id/billsrc",auth,transactionController.deleteBill);

transactionRouter.put(
  "/transactions/:id",
  auth,
  transactionController.updateTransaction
);

transactionRouter.delete(
  "/transactions/:id",
  auth,
  transactionController.removeTransaction
);

module.exports = transactionRouter;
