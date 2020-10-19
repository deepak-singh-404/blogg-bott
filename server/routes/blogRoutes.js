const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../utils/multerCloudinarySetUp')



const { addBlog, getBlogById, getAllBlogs, getBlogsOfLoggedInUser,
    deleteBlogById, updateBlogById } = require('../controllers/blogController')


router.get('/', getAllBlogs)

router.get('/:id', passport.authenticate('jwt', { session: false }), getBlogById)

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), addBlog)

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteBlogById)

router.put('/:id', passport.authenticate('jwt', { session: false }), updateBlogById)


module.exports = router