const Expense = require("../models/expense");

exports.getExpenses = async (req, res) => {
  try {
    //isDefault=true or userid = which is specified
    const expenses = await Expense.find({
      $or: [{ isDefault: true }, { userid: req.user._id }],
    });

    res.status(200).json(expenses);
  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const expense = new Expense({
      expense_name: req.body.expense_name,
      image_src :req.body.image_src,
      userid : req.user._id,
      isDefault: req.body.isDefault,
    });

    await expense.save();

    res.status(200).json(expense);

  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};
