const mongoose = require('mongoose')
const { Schema } = mongoose


const blogSchema = new Schema({
    blog: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    image: {
        type: String
    },
    author: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('blog', blogSchema)
