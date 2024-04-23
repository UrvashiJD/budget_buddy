const Payment = require("../models/payment");

exports.getPaymentModes = async (req, res) => {
    try{
        const paymentModes = await Payment.find();

        res.status(200).json(paymentModes);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : err
        });
    }
};
