const express = require("express");
const {homepage, userSignup, userSignin} = require("../controllers/userController")
const router = express.Router();

//homepage
router.get("/", homepage);

//usersignup
router.post("/signup", userSignup);

//usersignin
router.post("/signin", userSignin);

module.exports = router;
