// Import required modules and controllers
const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../controller/postController');
const UploadFileMiddleware = require('../middlewares/upload');

// Define the route handler for file upload and renaming
// When a POST request is made to the '/post' route, the middleware 'UploadFileMiddleware' will be executed first to handle file upload and validation.
// If the file upload is successful, the request will be passed to the 'postController.uploadFile' function to process the uploaded file.
router.post('/post', UploadFileMiddleware, postController.uploadFile);
router.get('/post', postController.getAllPosts)
router.get('/posts/:id', postController.getOnePost);
router.put('/post/:id',UploadFileMiddleware, postController.updatePost)
// Export the router to make it available for use in other parts of the application
module.exports = router;
