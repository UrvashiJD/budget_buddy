const Group = require("../models/group");
const GroupExpense = require("../models/group_expense");
const User = require("../models/user");

exports.getGroupExpenses = async (req, res) => {
  try {
    const groupExpenses = await GroupExpense.find({
      group_id: req.query.groupID,
    });
    if (groupExpenses) {
      return res.status(200).send(groupExpenses);
    }
  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};

exports.addGroupExpenses = async (req, res) => {
  try {
    const groupExpense = new GroupExpense({
      expense_desc: req.body.expense_desc,
      total_expense: req.body.total_expense,
      split_amount: req.body.split_amount,
      t_day: req.body.t_day,
      t_month: req.body.t_month,
      t_year: req.body.t_year,
      group_id: req.body.group_id,
    });

    groupExpense.save().then(() => {
      //605xff5d=5800,605xff5e=2200
      groupExpense.addPaidBy(req.body.paid_by).then(() => {
        //605xff5d:605xff5e=5800,605xff5e:605xff5d=2200
        groupExpense.addSettlement(req.body.settlement).then(() => {
          res.status(200).send(groupExpense);
        });
      });
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      error: "Invalid Data Sent !!",
    });
  }
};
