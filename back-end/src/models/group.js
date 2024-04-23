const mongoose = require("mongoose");
const User = require("./user");

const groupSchema = mongoose.Schema({
  group_name: {
    type: String,
    required: true,
  },
  group_imgsrc: {
    type: String,
    required: true,
  },
  group_type: {
    type: String,
    required: true,
  },
  group_members: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  ],
});

//instance methods
groupSchema.methods.addGroupMembers = async function (members, admin) {
  const group = this;
  let arr = members.split(",");
  
  group.group_members = group.group_members.concat({ member: admin });
  const user = await User.findById(admin);
  user.groups = user.groups.concat({ group: group._id });
  await user.save();

  for (const member of arr) {
    group.group_members = group.group_members.concat({ member });
    const user = await User.findById(member);
    user.groups = user.groups.concat({ group: group._id });
    await user.save();
  }

  await group.save();
};

const Group = new mongoose.model("Group", groupSchema);

module.exports = Group;
