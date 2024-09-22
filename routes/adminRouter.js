const express = require("express");
const {homepage, adminSignup, adminSignin, createOrder} = require("../controllers/adminController")
const router = express.Router();

//homepage
router.get("/", homepage);

//signup
router.post("/signup", adminSignup);

//signin
router.post("/signin", adminSignin);

//createorder
router.post("/create-order", createOrder);

module.exports = router;