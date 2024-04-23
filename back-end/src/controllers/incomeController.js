const Income = require("../models/income");

exports.getIncomes = async (req, res) => {
  try {
    //isDefault=true or userid = which is specified
    const incomes = await Income.find({
      $or: [{ isDefault: true }, { userid: req.user._id }],
    });

    res.status(200).json(incomes);
  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};

exports.addIncome = async (req, res) => {
  try {
    const income = new Income({
      income_name: req.body.income_name,
      image_src :req.body.image_src,
      userid : req.user._id,
      isDefault: req.body.isDefault,
    });

    await income.save();

    res.status(200).json(income);

  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};
