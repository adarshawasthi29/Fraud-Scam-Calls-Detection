const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author : String,
    title : String,
    description : String,
    content : String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
