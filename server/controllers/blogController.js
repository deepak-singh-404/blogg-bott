const cloudinary = require('../utils/cloudinary')

const Blog = require('../models/blog')
const User = require('../models/user')


module.exports = {
    getBlogsOfLoggedInUser: async (req, res, next) => {
        try {
            const blogs = await Blog.find({ user: req.user.id.toString() }).sort({ createdAt: -1 })
            if (blogs.length === 0) {
                return res.status(404).json({ message: "No Blogs Found", success: false})
            }
            return res.status(200).json({message: blogs, success: true})
        }
        catch (err) {
            console.log('Error in getBlogsOfLoggedInUser', err.message)
            res.status(400).json({ Error: err.message, success: false})
        }

    },
    addBlog: async (req, res, next) => {
        try {
            const { id, name } = req.user
            let image;
            if (req.file && req.file.path) {

                image = req.file.path
            }
            const { blog, title, category } = req.body
            const newBlog = await new Blog({
                blog,
                title,
                category,
                image,
                author: name,
                user: id
            })
            await newBlog.save()
            const user = await User.findById(id)
            user.blogs.unshift(newBlog.id)
            await user.save()
            return res.status(200).json({message:newBlog,success:true})
        }
        catch (err) {
            console.log('Error in addBlog', err.message)
            res.status(400).json({ Error: err.message, success: false })
        }
    },
    getAllBlogs: async (req, res, next) => {
        try {
            const blogs = await Blog.find().sort({ createdAt: -1 })
            if (blogs.length === 0) {
                return res.status(404).json({ message: "No Blogs found", success: false})
            }
            return res.status(200).json({message: blogs, success: true})
        }
        catch (err) {
            console.log('Error in getAllBlogs', err.message)
            res.status(400).json({ Error: err.message, success: false})
        }
    },
    getBlogById: async (req, res, next) => {
        try {
            const { id } = req.params
            const blog = await Blog.findById(id)
            if (!blog) {
                return res.status(404).json({ message: "No Blog found with given id", success: false})
            }
            return res.status(200).json({message: blog, success: true})
        }
        catch (err) {
            console.log('Error in getBlogById', err.message)
            res.status(400).json({ Error: err.message, success: false})
        }
        
    },
    deleteBlogById: async (req, res, next) => {
        try {
            const{id} = req.params
            const blog = await Blog.findById(id)
            if (!blog) {
                return res.status(404).json({message:"Invalid Request, No blog exist with given Id", success: false})
            }
            if (blog.user.toString() !== req.user.id) {
                return res.status(401).json({ message: "Unauthorized User", success: false})
            }
            const user = await User.findById(req.user.id)
            const index = user.blogs.findIndex(blogId => blogId.toString() === id.toString())
            if (index === -1) {
                return res.status(401).json({ message: "Unauthorized User", success: false })
            }
            user.blogs.slice(index, 1)
            await user.save()
            await blog.remove()
            return res.status(200).json({message:"Successfully Deleted", success: true})
        }
        catch (err) {
            console.log('Error in deleteBlogById', err.message)
            res.status(400).json({ Error: err.message, success: false})
        }

    },
    updateBlogById: async (req, res, next) => {
        try {
            let image;
            if (req.file && req.file.path) {
                image = req.file.path
            }
            const { blog, title, category } = req.body
            const currentBlog = await Blog.findById(req.params.id)
            if (!currentBlog) {
                return res.status(404).json({ message:"Blog not found with given Id", success: false})
            }
            if (image) {
                currentBlog.image = image
            }
            if (blog) {
                currentBlog.blog = blog
            }
            if (title) {
                currentBlog.title = title
            }
            if (category) {
                currentBlog.category = category
                
            }
            await currentBlog.save()
            console.log("sdfd",currentBlog)
            return res.status(200).json({ message: currentBlog, success: true })
        }
        catch (err) {
            console.log('Error in updateBlogById', err.message)
            res.status(400).json({ Error: err.message })
        }

    }


}