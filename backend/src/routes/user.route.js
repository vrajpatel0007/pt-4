const express = require("express");
const user_controller = require("../controllers/user.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth");



router.post("/register", user_controller.register);
router.get("/profile", authUser, user_controller.profile);
router.put("/userupdate", authUser, user_controller.userupdate);
router.delete("/usersdelete", authUser, user_controller.usersdelete);
router.post("/login", user_controller.login);
router.put("/updatepassword", authUser, user_controller.updatepassword);





module.exports = router;
