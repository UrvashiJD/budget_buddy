const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    t_name:{
        type:String,
        required : true,
    },
    t_desc :{
        type:String,
    },
    t_category :{
        type:String,
        required : true,
    },
    t_amount : {
        type: String,
        required : true,
    },
    t_day:{
        type:Number,
        required : true,
    },
    t_month:{
        type:Number,
        required : true,
    },
    t_year:{
        type:Number,
        required : true,
    },
    t_billsrc : {
        type: String,
    },
    t_imgsrc:{
        type: String,
        required : true,
    },
    p_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required :true,
    }
})

const Transaction = mongoose.model("Transaction",transactionSchema)

module.exports = Transaction;