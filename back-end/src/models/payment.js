const mongoose = require("mongoose")

const paymentSchema = mongoose.Schema({
    p_name:{
        type:String,
        required : true,
    },
    p_imgsrc :{
        type: String,
        required: true,
    }
})

const Payment = mongoose.model("Payment",paymentSchema)

module.exports = Payment;