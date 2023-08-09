const Router = require('express'); // Import the Express router module
const userController = require('../controller/userController'); // Import the userController to handle user-related operations

const router = Router.Router(); // Create an instance of the Express router

// Define the '/register' route, which will be handled by the 'userController.register' function
router.post('/register', userController.register);

// Define the '/login' route, which will be handled by the 'userController.login' function
router.post('/login', userController.login);

router.get('/profile', userController.profile)
router.post('/logout', userController.logout)

// Export the router to make it available for use in other parts of the application
module.exports = router;
