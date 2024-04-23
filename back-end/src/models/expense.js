const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    expense_name:{
        type:String,
        required : true,
    },
    image_src :{
        type:String,
        required : true,
    },
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    isDefault : {
        type: Boolean,
        default : false,
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
