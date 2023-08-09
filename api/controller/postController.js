// Import the Node.js file system module to work with files
const fs = require('fs')
const jwt = require('jsonwebtoken')
const userModel = require('../model/user')

// Import the Post model from the specified file path (../model/post)
const postModel = require('../model/post');
const { json } = require('body-parser');

// Define the function to handle file upload, renaming, and post creation
exports.uploadFile = async function (req, res) {
    try {
        // Extract the original file name and the temporary path where the file is stored
        const { originalname, path } = req.file;

        // Split the original file name to get its extension
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];

        // Append the extension to the temporary path to create a new path with the correct extension
        const newPath = path + '.' + ext;

        // Rename the file from the temporary path to the new path with the correct extension
        await fs.renameSync(path, newPath);
        const { token } = req.cookies
        jwt.verify(token, "securityKey", {}, async (err, info) => {
            const newPost = new postModel({
                title: req.body.title,
                summary: req.body.summary,
                content: req.body.content,
                cover: newPath, // Save the file path in the Post model if needed
                author: info.id   // Get user ID from session cookie
            });
            // Create a new post using the Post model and data from the request body
            // Save the new post to the database
            await newPost.save();
        })



        // Respond to the client with a JSON object indicating successful file upload and post creation
        return res.json({ message: 'File uploaded, renamed, and new post created successfully' });
    } catch (err) {
        // If there was an error during the upload, renaming, or post creation process, handle it and respond with an error message.
        console.error('Error while uploading, renaming, and creating the post:', err);
        return res.status(500).json({ error: 'Failed to upload, rename, and create the post' });
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        return res.json(
            await postModel.find()
                .populate('author', 'username')
                .sort({ createdAt: -1 })
                .limit(20)
        );
    } catch (err) {
        console.error('Error while fetching posts:', err);
        return res.status(500).json({ error: 'Failed to fetch posts' + err });
    }
}


exports.getOnePost = async (req, res) => {
    try {
        return res.json(await postModel.findById(req.params.id).populate('author', 'username'))
    } catch (err) {
        return res.status(400).json({ error: 'Failed to fetch posts' + err });
    }
}

exports.updatePost = async (req, res) => {
    try {
        let newPath = null;

        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            await fs.rename(path, newPath);
        }

        const { token } = req.cookies;
        const info = jwt.verify(token, "securityKey");

        const { id, title, summary, content } = req.body;
        const postDoc = await postModel.findById(id);

        if (!postDoc) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

        if (!isAuthor) {
            return res.status(400).json("You Are Not The Author");
        }

        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newPath ? newPath : postDoc.cover;

        await postDoc.save();
        res.json(postDoc)
    } catch (err) {
        return res.status(400).json({ error: 'Failed to update the post: ' + err });
    }
};