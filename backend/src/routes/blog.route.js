const express = require("express");
const router = express.Router();
const blog_controller = require("../controllers/blog.controller");
const upload = require("../middleware/multer");
const { authUser } = require("../middleware/auth");

router.post("/create", authUser, upload.single("image"),  blog_controller.createblog)
router.get("/blog_list", authUser, blog_controller.list)
router.delete("/blog_delete", authUser, blog_controller.delet_blog)
router.get("/userblog", authUser, blog_controller.userblog)
router.put("/update_blog", authUser,upload.single("image"), blog_controller.update_blog)



module.exports = router;