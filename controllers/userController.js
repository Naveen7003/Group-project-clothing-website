const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const userModel = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const {sendtoken} = require("../utils/SendToken")
exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Homepage" });
});

exports.userSignup = catchAsyncErrors(async (req, res, next) => {
  const User = await new userModel(req.body).save();
  sendtoken(User, 201, res)
});

exports.userSignin = catchAsyncErrors(async (req, res, next) => {
  const User = await userModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!User) {
    next(new ErrorHandler("User with this email address not found"));
  }

  const isMatch = User.comparepassword(req.body.password);
  if (!isMatch) {
    next(new ErrorHandler("Wrong Credentials", 404));
  }

  sendtoken(User, 201, res);
});
