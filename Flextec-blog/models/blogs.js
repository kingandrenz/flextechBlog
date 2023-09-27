const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Replace 'User' with the actual model name for your users
        required: true, // Depending on your business logic, you may want this to be required
    },
    image: String

}, {timestamps: true});

//models
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;