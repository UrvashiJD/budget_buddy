const Debtor = require("../models/debtor");

exports.getDebtors = async (req, res) => {
    try{
        const debtors = await Debtor.find({ userid: req.user._id});

        res.status(200).json(debtors);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : err
        });
    }
};

exports.addDebtor = async (req, res) => {
    try{
        const debtor = new Debtor({
            deb_name : req.body.deb_name,
            deb_mobile : req.body.deb_mobile,
            deb_amount : req.body.deb_amount,
            deb_desc : req.body.deb_desc,
            deb_day :  req.body.deb_day,
            deb_month : req.body.deb_month,
            deb_year : req.body.deb_year,
            userid : req.user._id,
        });

        await debtor.save();

        res.status(200).json(debtor);
    }catch(e){
        res.status(400).json({
            status: "fail",
            error: "Invalid Data Sent !!"
        });
    }
}

exports.removeDebtor = async (req, res) => {
    try{
        const debtor = await Debtor.findOneAndDelete({_id: req.params.id , userid : req.user._id});
        if (!debtor) {
            return res.status(404).send("Not deleted");
          }
          res.status(200).json(debtor);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : err
        });
    }
}

exports.updateDebtor = async(req, res) => {
    try{
        const debtor = await Debtor.findOneAndUpdate({_id: req.params.id, userid: req.user._id},req.body, {
            //updated document will be returned
               new: true,
               runValidators: true,
             });
        if (!debtor) {
            return res.status(404).send();
        }
        res.status(200).json(debtor);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : err
        });
    }
} 