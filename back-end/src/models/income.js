const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
    income_name:{
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
        default : true,
    }
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
