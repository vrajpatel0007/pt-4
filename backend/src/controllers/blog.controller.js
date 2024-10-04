const blog_service = require("../services/blog.service")
const fs = require("fs")
const path = require('path');
const createblog = async (req, res) => {
    const reqbody = req.body;
    const userId = req.user._id;

    console.log("🚀 ~ createblog ~ reqbody:", reqbody);
    console.log("🚀 ~ createblog ~ req.file:", req.file);
    console.log("🚀 ~ createblog ~ req.body:", req.body);

    try {
        if (!reqbody.Title || !reqbody.content) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required." });
        }

        const imageUrl = `http://localhost:8000/public/temp/${req.file.filename}`;

        console.log("🚀 ~ createblog ~ imageUrl:", imageUrl)
        const body = {
            Title: reqbody.Title,
            image: imageUrl,
            content: reqbody.content,
            user: userId
        };

        const blog = await blog_service.createblog(body);
        return res.status(200).json({ message: "Blog created successfully.", blog });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



const list = async (req, res) => {
    try {
        const list = await blog_service.list();
        return res.status(200).json({ message: "All list ", blog: list });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const delet_blog = async (req, res) => {
    const blogId = req.body.blogId
    console.log("🚀 ~ constdelet_blog= ~ blogId:", blogId)
    try {
        const blogExists = await blog_service.findId(blogId);
        console.log("🚀 ~ constdelet_blog= ~ blogExists:", blogExists)
        if (!blogExists) {
            return res.status(404).json({ message: "blog Not Found" });
        }
        const blog = await blog_service.deleteblog(blogId);
        return res.status(200).json({ message: "blog Deleted Successfully" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const userblog = async (req, res) => {
    const userId = req.user._id
    console.log("🚀 ~ userblog ~ userId:", userId)
    try {
        const list = await blog_service.blog(userId);
        return res.status(200).json({ message: "user blog list ", blog: list });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const update_blog = async (req, res) => {
    const userId = req.body.userId
    console.log("🚀 ~ userblog ~ userId:", userId)
    try{
        const blogid = req.body._id
    const blogExists = await blog_service.taskByid(blogid);
    if (!blogExists) {
      return res.status(400).json({ message: "Blog Not Exists" });
    }
    const body = {};
    if (req.body) {
      body.Title = req.body.Title,
       body.content = req.body.content;
    }
    if (req.files && req.files.image) {
      const parth = blogExists.image;
      fs.unlink(parth, (err) => {
        if (err) {
          console.log(`An error occurred ${err.message}`);
        } else {
          console.log("Deleted image");
        }
      });
      body.image = "public/temp/" + req.files.image[0].filename;
    }
    console.log("🚀 ~ blog ~ body:", body);
    const update = await blog_service.updatablog(blogid, body);
    return res
      .status(200)
      .json({ message: "blog Updata successfully", data: update });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}





module.exports = {
    createblog,
    list,
    delet_blog,
    userblog,
    update_blog
}
