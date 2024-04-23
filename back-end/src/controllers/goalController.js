const Goal = require("../models/goal");
const GoalCategory = require("../models/goalCategory");

exports.getGoals = async (req, res) => {
    try{
        const goals = await Goal.find({ userid: req.user._id,is_reached : false});

        res.status(200).json(goals);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : e
        });
    }
};

exports.getReachedGoals = async (req, res) => {
    try{
        const goals = await Goal.find({ userid: req.user._id,is_reached : true});

        res.status(200).json(goals);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : e
        });
    }
};

exports.getGoalCategories = async (req, res) => {
    try{
        const goalCategories = await GoalCategory.find();

        res.status(200).json(goalCategories);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : e
        });
    }
};

exports.addGoal = async (req, res) => {
    try{
        const goal = new Goal({
            g_target_amount : req.body.g_target_amount,
            g_saved_amount : req.body.g_saved_amount,
            g_desc : req.body.g_desc,
            g_day :req.body.g_day,
            g_month :req.body.g_month,
            g_year : req.body.g_year,
            gc_id : req.body.gc_id,
            userid : req.user._id,
        });

        await goal.save();

        res.status(200).json(goal);
    }catch(e){
        res.status(400).json({
            status: "fail",
            error: "Invalid Data Sent !!"
        });
    }
}

exports.removeGoal = async (req, res) => {
    try{
        const goal = await Goal.findOneAndDelete({_id: req.params.id , userid : req.user._id});
        if (!goal) {
            return res.status(404).send("Invalid Delete !");
          }
        res.status(200).json(goal);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : e
        });
    }
}

exports.updateGoal = async(req, res) => {
    try{
        const goal = await Goal.findOneAndUpdate({_id: req.params.id, userid: req.user._id},req.body, {
            //updated document will be returned
               new: true,
               runValidators: true,
             });
        if (!goal) {
            res.status(404).json({
                status : "Fail",
                message : "Goal not found"
            });
        }
        res.status(200).json(goal);
    }catch(e){
        res.status(404).json({
            status : "Fail",
            message : e
        });
    }
} 