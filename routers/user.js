const express = require("express");
const {getSingleUser, getAllUsers} = require("../controllers/user");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");
const userQueryMiddleware = require("../middlewares/query/userQueryMiddleware");
const User = require("../models/user");
const router = express.Router();

router.get("/", userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExist, getSingleUser); //:id sending id

module.exports = router;
