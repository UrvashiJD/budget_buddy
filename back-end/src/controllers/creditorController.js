const Creditor = require("../models/creditor");

exports.getCreditors = async (req, res) => {
  try {
    //projection - send only limited fields to the user
    //const creditors = await Creditor.find({ userid: req.user._id}).select("cre_name cre_mobile");\
    // -cre_mobile means send all the fields excluding cre_mobile
    //const creditors = await Creditor.find({ userid: req.user._id}).select("-cre_mobile");

    const creditors = await Creditor.find({ userid: req.user._id });

    res.status(200).send(creditors);
  } catch (e) {
    res.send(e);
  }
};

exports.addCreditor = async (req, res) => {
  try {
    const creditor = new Creditor({
      cre_name: req.body.cre_name,
      cre_mobile: req.body.cre_mobile,
      cre_amount: req.body.cre_amount,
      cre_desc: req.body.cre_desc,
      cre_day: req.body.cre_day,
      cre_month: req.body.cre_month,
      cre_year: req.body.cre_year,
      userid: req.user._id,
    });

    await creditor.save();

    res.status(200).send(creditor);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.removeCreditor = async (req, res) => {
  try {
    const creditor = await Creditor.findOneAndDelete({
      _id: req.params.id,
      userid: req.user._id,
    });
    if (!creditor) {
      return res.status(404).send("Not deleted");
    }
    res.status(200).send(creditor);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateCreditor = async (req, res) => {
  try {
    const creditor = await Creditor.findOneAndUpdate(
      { _id: req.params.id, userid: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!creditor) {
      return res.status(404).send();
    }
    res.status(200).send(creditor);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getCreditorStats = async (req, res) => {
  try {
    const stats = await Creditor.aggregate([
      {
        $group: {
          _id: "$userid",
          numCreditors: { $sum: 1 },
          minAmount: { $min: "$cre_amount" },
          maxAmount: { $max: "$cre_amount" },
          avgAmount: { $avg: "$cre_amount" },
        },
      },
      {
        $sort: {
          avgAmount: 1,
        },
      },
      {
        $match: {
          numCreditors: { $gt: 2 },
        },
      },
    ]);

    res.status(200).json({
      status: "Success",
      data: {
        stats,
      },
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
