const mongoose = require("mongoose")

const goalCategorySchema = mongoose.Schema({
    gc_name:{
        type:String,
        required : true,
    },
    gc_imgsrc :{
        type:String,
    },
})

const GoalCategory = mongoose.model("GoalCategory",goalCategorySchema)

module.exports = GoalCategory;