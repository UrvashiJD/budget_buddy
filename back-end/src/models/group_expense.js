const mongoose = require("mongoose");

const groupExpenseSchema = mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  expense_desc: {
    type: String,
    required: true,
  },
  total_expense: {
    type: String,
  },
  split_amount: {
    type: String,
  },
  t_day: {
    type: Number,
    required: true,
  },
  t_month: {
    type: Number,
    required: true,
  },
  t_year: {
    type: Number,
    required: true,
  },
  settlement: [
    {
      who: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      whom: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],
  paid_by: [
    {
      who: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],
});

//instance methods
groupExpenseSchema.methods.addPaidBy = async function (data) {
  const groupExpense = this;
  let members = data.split(",");
  //605xff5d=5800,605xff5e=2200

  for (const member of members) {
    let values = member.split("=");
    let i = 0;
    let who, amount;
    for (const value of values) {
      if (i == 0) {
        //memeber id
        who = value;
      } else {
        //amount
        amount = value;
      }
      i++;
    }
    groupExpense.paid_by = groupExpense.paid_by.concat({ who, amount });
  }

  await groupExpense.save();
};

groupExpenseSchema.methods.addSettlement = async function (data) {
  const groupExpense = this;
  let settlements = data.split(",");
  //605xff5d:605xff5e=5800,605xff5e:605xff5d=2200

  for (const settlement of settlements) {
    //605xff5d:605xff5e=5800

    let values = settlement.split("=");
    let who, whom, amount;
    let i = 0;
    for (const value of values) {
      if (i == 0) {
        //memebers
        let person = value.split(":");
        let j = 0;
        for (const p of person) {
          if (j == 0) {
            //sender
            who = p;
          } else {
            //receiver
            whom = p;
          }
          j++;
        }
      } else {
        //amount
        amount = value;
      }
      i++;
    }
    groupExpense.settlement = groupExpense.settlement.concat({ who, whom, amount });
  }

  await groupExpense.save();
};

const GroupExpense = mongoose.model("GroupExpense", groupExpenseSchema);

module.exports = GroupExpense;
