const { catchAsyncErrors } = require("../middlewares/catchAsyncError")
const adminModel = require("../models/Admin")
const {sendtoken} = require("../utils/SendToken");
const ErrorHandler = require("../utils/ErrorHandler")
const clothModel = require("../models/Cloth")


exports.homepage = catchAsyncErrors(async(req, res, next) =>{
    res.json({message: "Homepage"})
})

exports.adminSignup = catchAsyncErrors(async(req, res, next) =>{
    const Admin = await new adminModel(req.body).save();
    sendtoken(Admin, 201, res)
});

exports.adminSignin = catchAsyncErrors(async(req, res, next) =>{
    const Admin = await adminModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!Admin) {
    next(new ErrorHandler("Admin with this email address not found"));
  }

  const isMatch = Admin.comparepassword(req.body.password);
  if (!isMatch) {
    next(new ErrorHandler("Wrong Credentials", 404));
  }

  sendtoken(Admin, 201, res);
})

exports.createOrder = catchAsyncErrors(async(req, res, next) =>{
    const Order = await new clothModel(req.body).save()

    const Admin = await adminModel.findByIdAndUpdate(req.id, { $push: { createdOrders: Order._id } },
        { new: true })
    res.status(201).json({message: "order created"})
})