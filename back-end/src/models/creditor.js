const mongoose = require("mongoose");

const creditorSchema = mongoose.Schema({
  cre_name: {
    type: String,
    required: true,
    trim: true,
  },
  cre_mobile: {
    type: String,
    required: true,
    length: 10,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cre_amount: {
    type: String,
    required: true,
  },
  cre_desc: {
    type: String,
    required: true,
  },
  cre_day: {
    type: Number,
    required: true,
  },
  cre_month: {
    type: Number,
    required: true,
  },
  cre_year: {
    type: Number,
    required: true,
  },
});

const Creditor = mongoose.model("Creditor", creditorSchema);

module.exports = Creditor;
