const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const userRouter = new express.Router();

userRouter.get("/users", auth, userController.getUsers);
userRouter.get("/users/me", auth, userController.getProfileData);
userRouter.put("/users/me", auth, userController.updateProfileData);
userRouter.get("/users/:id", auth, userController.getGivenUserData);
userRouter.post("/users/uploadProfileData",auth, userController.uploadProfileData);
userRouter.post("/users/logout", auth,userController.logoutMe);
userRouter.post("/users/sendOTP", userController.sendOTP);
userRouter.post("/users/verifyOTP",userController.verifyOTP );

module.exports = userRouter;