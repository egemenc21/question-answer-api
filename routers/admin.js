const express = require("express");
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

const {blockUser,deleteUser} = require("../controllers/admin");
// Block User
// Delete User

// General Middlewares
router.use([getAccessToRoute, getAdminAccess]); // its valid for all routes

router.get("/block/:id", checkUserExist,blockUser);
router.delete("/user/:id", checkUserExist,deleteUser)

module.exports = router;
