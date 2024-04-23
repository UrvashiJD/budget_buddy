const Transaction = require("../models/transaction");
const path = require("path");
const fs = require("fs");

exports.getTransactions = async (req, res) => {
  try {
    var transactions;
    if(req.query.month && req.query.year){
      transactions = await Transaction.find({
        userid: req.user._id,
        t_month: req.query.month,
        t_year: req.query.year,
      });
    }else{
      transactions = await Transaction.find({
        userid: req.user._id,
      });
    }

    res.status(200).json(transactions);
  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      t_name: req.body.t_name,
      t_desc: req.body.t_desc,
      t_day: req.body.t_day,
      t_month: req.body.t_month,
      t_year: req.body.t_year,
      t_amount: req.body.t_amount,
      t_billsrc: req.body.t_billsrc,
      t_imgsrc : req.body.t_imgsrc,
      p_id: req.body.p_id,
      userid: req.user._id,
      t_category: req.body.t_category,
    });

    await transaction.save();

    res.status(200).json(transaction);
  } catch (e) {
    res.status(400).json({
      status: "fail",
      error: e,
    });
  }
};

exports.addBillSrcToTransaction =  async (req, res) => {
  try {
    
    //must be findOne 
    const transaction = await Transaction.findOne({_id : req.params.id});

    if(!transaction){
      return res.status(404).send("Not Found");
    }
    transaction.t_billsrc = req.file.filename;

    await transaction.save();

    res.status(200).send(transaction);

  } catch (e) {
    res.status(400).json({
      status: "fail",
      error: e,
    });
  }
};

exports.getTransactionBill = async (req,res)=>{
  try {

    const transaction = await Transaction.findOne({_id : req.params.id});

    if (!transaction || !transaction.t_billsrc) {
      throw new Error();
    }

    const filePath = path.join(__dirname, "../uploads/"+transaction.t_billsrc);
   
    res.set("Content-Type", "image/png");
    res.status(200).sendFile(filePath);

  } catch (e) {
    res.status(400).send({ error: "Image not found" });
  }
}

exports.deleteBill = async (req,res)=>{
  const transaction = await Transaction.findOne({_id: req.params.id});

  if(!transaction){
    //wrong transaction not in db
    return  res.status(404).json("Transaction not found");
  }else if(transaction.t_billsrc==req.body.billSrc){
    //right transaction and its billsrc
    try {
      fs.unlinkSync(path.join(__dirname, "../uploads/"+req.body.billSrc));
      return res.status(200).send('Successfully! Image has been Deleted');
    } catch (err) {
      // handle the error
      return res.status(400).send(err);
    }
  }else{
    //transaction found but wrong billSrc
    return res.status(200).json("Invalid Delete");
  }
};

exports.removeTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userid: req.user._id,
    });
    if (!transaction) {
      return res.status(404).send("Not deleted");
    }
    res.status(200).json(transaction);
  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userid: req.user._id },
      req.body,
      {
        //updated document will be returned
        new: true,
        runValidators: true,
      }
    );
    
    if (!transaction) {
      return res.status(404).send();
    }
    res.status(200).json(transaction);
  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};
