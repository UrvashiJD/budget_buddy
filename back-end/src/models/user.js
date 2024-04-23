const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    user_mobile: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
      trim: true,
      unique: true,
    },
    user_name: {
      type: String,
      trim: true,
    },
    profile_pic: {
      type: String,
    },
    is_premium: {
      type: Boolean,
      default: false,
    },
    groups: [
      {
        group: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
          required: true,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);


//this method on user will be called automatically whenever user object is send in res.send(user)
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.groups;
  return userObject;
};

//instance methods
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    `${process.env.JWT_SECRET}`
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
