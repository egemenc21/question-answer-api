const express = require("express");
const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");


const router = express.Router();

router.use("/questions", question);
router.use("/auth", auth);
router.use("/user", user);
router.use("/admin", admin);

module.exports = router;