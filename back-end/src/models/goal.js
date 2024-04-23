const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  g_desc: {
    type: String,
  },
  g_target_amount: {
    type: String,
    required: true,
  },
  g_saved_amount :{
    type: String,
    required: true,
  },
  g_day: {
    type: Number,
    required: true,
  },
  g_month: {
    type: Number,
    required: true,
  },
  g_year: {
    type: Number,
    required: true,
  },
  gc_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GoalCategory",
  },
  is_reached: {
    type: Boolean,
    default: false,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
