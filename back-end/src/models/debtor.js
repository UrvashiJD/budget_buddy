const mongoose = require("mongoose");

const debtorSchema = mongoose.Schema({
  deb_name: {
    type: String,
    required: true,
    trim: true,
  },
  deb_mobile: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  deb_amount: {
    type: String,
    required: true,
  },
  deb_desc: {
    type: String,
    required: true,
  },
  deb_day: {
    type: Number,
    required: true,
  },
  deb_month: {
    type: Number,
    required: true,
  },
  deb_year: {
    type: Number,
    required: true,
  },
});

const Debtor = mongoose.model("Debtor", debtorSchema);

module.exports = Debtor;
