// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");
const User = require('../model/user')

// Create a reference to the Mongoose Schema class
const Schema = mongoose.Schema;

// Define the schema for the 'Post' collection in MongoDB
const postSchema = new Schema({
    // The 'title' field will store the title of the post as a string
    title: String,

    // The 'summary' field will store a brief summary of the post as a string
    summary: String,

    // The 'content' field will store the main content of the post as a string
    content: String,

    // The 'file' field can be used to store the file path or URL related to the post as a string
    // For example, you can store the path to the uploaded file if it's stored on the server,
    // or you can store the URL of the file if it's hosted elsewhere (e.g., AWS S3, a CDN, etc.)
    cover: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: User
    }
}, {
    // The 'timestamps' option adds 'createdAt' and 'updatedAt' fields to the document
    // with the timestamps of the document creation and last update, respectively
    timestamps: true
});

// Create a model named 'Post' based on the 'postSchema' and export it
// This model will allow us to interact with the 'Post' collection in MongoDB
module.exports = mongoose.model('Post', postSchema);
