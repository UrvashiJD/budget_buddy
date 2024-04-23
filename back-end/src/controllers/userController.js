const User = require("../models/user");

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      res.status(200).send(users);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateProfileData = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id },req.body,{
        //updated document will be returned
         new: true,
         runValidators: true,
       });

    if(!user){
      res.status(404).send();
    }

    res.status(200).send(user);

  } catch (e) {
    res.status(400).send({
      error: "Profile data updated Failed",
      msg: e,
    });
  }
};

exports.uploadProfileData = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    user.user_name = req.body.user_name;
    user.profile_pic = req.body.profile_pic;

    await user.save();

    res.status(200).send({
      user,
    });
  } catch (e) {
    res.status(400).send({
      error: "Profile data upload Failed",
      msg: e,
    });
  }
};

exports.sendOTP = async (req, res) => {
  if (req.body.user_mobile) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: `+91${req.body.user_mobile}`,
        channel: "sms",
      })
      .then((data) => {
        res.status(200).send({
          message: "OTP is sent on your mobile number!!",
          phonenumber: req.body.user_mobile,
        });
      });
  } else {
    res.status(400).send({
      message: "Wrong phone number :(",
      phonenumber: req.query.phonenumber,
      data,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    if (req.body.user_mobile && req.body.otp) {
      const user = await User.findOne({ user_mobile: req.body.user_mobile });

      let isRegisterdUser = false;

      if (user) {
        isRegisterdUser = true;
      } else {
        isRegisterdUser = false;
      }

      client.verify
        .services(process.env.SERVICE_ID)
        .verificationChecks.create({
          to: `+91${req.body.user_mobile}`,
          code: req.body.otp,
        })
        .then((data) => {
          if (data.status === "approved") {
            if (!isRegisterdUser) {
              const user = new User({
                user_mobile: req.body.user_mobile,
              });

              user.save().then(() => {
                user.generateAuthToken().then((token) => {
                  res.status(200).send({
                    message: "User is Verified!!",
                    isRegisterdUser,
                    token,
                  });
                });
              });
            } else {
              user.generateAuthToken().then((token) => {
                res.status(200).send({
                  message: "User is Verified!!",
                  isRegisterdUser,
                  token,
                });
              });
            }
          } else {
            res.status(400).send({
              message: "User is not varified!!",
              isRegisterdUser,
            });
          }
        });
    } else {
      res.status(400).send({
        message: "Invalid Request",
      });
    }
  } catch (e) {
    res.status(400).send({
      message: "Wrong phone number :(",
      phonenumber: req.query.phonenumber,
      data,
    });
  }
};

exports.getProfileData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getGivenUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.logoutMe = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).json({
      status: "Fail",
      message: e,
    });
  }
};
