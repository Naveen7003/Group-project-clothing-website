const express = require("express");
const {homepage} = require("../controllers/userController")
const router = express.Router();

//homepage
router.get("/", homepage);

module.exports = router;
