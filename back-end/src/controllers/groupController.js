const Group = require("../models/group");
const User = require("../models/user");

exports.getGroups = async (req, res) => {
  try {
    let myGroups = [];
    const user = await User.findById(req.user._id);

    for (let group of user.groups) {
      const fetchedGroup = await Group.findById(group.group);
      myGroups.push(fetchedGroup);
    }
    
    return res.status(200).send(myGroups);
  } catch (e) {
    res.status(404).json({
      status: "Fail",
      message: e,
    });
  }
};

exports.addGroup = async (req, res) => {
  try {
    const group = new Group({
      group_name: req.body.group_name,
      group_imgsrc: req.body.group_imgsrc,
      group_type: req.body.group_type,
    });

    group.save().then(() => {
      group.addGroupMembers(req.body.members, req.user._id).then(() => {
        res.status(200).send(group);
      });
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      error: "Invalid Data Sent !!",
    });
  }
};
