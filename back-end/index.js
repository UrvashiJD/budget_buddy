const express = require("express");
const mypath = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

require("./src/config/db");


const userRouter = require("./src/routers/userRouter");
const debtorRouter = require("./src/routers/debtorRouter");
const creditorRouter = require("./src/routers/creditorRouter");
const goalRouter = require("./src/routers/goalsRouter");
const incomeRouter = require("./src/routers/incomeRouter");
const expenseRouter = require("./src/routers/expenseRouter");
const transactionRouter = require("./src/routers/transactionRouter");
const paymentModeRouter = require("./src/routers/paymentModesRouter");
const groupRouter = require("./src/routers/groupRouter");
const groupExpenseRouter = require("./src/routers/groupExpenseRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static(mypath.join(__dirname, "../uploads")));
app.use("/api", userRouter);
app.use("/api", debtorRouter);
app.use("/api", creditorRouter);
app.use("/api", goalRouter);
app.use("/api", incomeRouter);
app.use("/api", expenseRouter);
app.use("/api", transactionRouter);
app.use("/api", paymentModeRouter);
app.use("/api", groupRouter);
app.use("/api", groupExpenseRouter);

app.get("*", (req, res) => {
  res.status(400).send("404 : Not Found");
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
