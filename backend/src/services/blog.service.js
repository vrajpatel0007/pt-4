const Blog = require("../models/blog.model")

const createblog = async (body) => {
    return await Blog.create(body)
}

const list = async () => {
    return await Blog.find()
}

const deleteblog = async (blogId) => {
    return Blog.findByIdAndDelete(blogId)
}

const findId = async (blogId) => {
    return await Blog.findById(blogId)
}

const blog = async (userId) => {
    return await Blog.find({ user: userId })
}
const updatablog = async (id,body) => {
    return Blog.findByIdAndUpdate(id, { $set: body }, { new: true })
}

module.exports = {
    createblog,
    list,
    deleteblog,
    findId,
    blog,
    updatablog
}