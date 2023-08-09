// Import necessary modules and models
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to handle user registration
exports.register = async function (req, res) {
    try {
        // Create a new instance of userModel with the data from the request body
        let newUser = new userModel(req.body);

        // Hash the user's password with a salt factor of 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Assign the hashed password to the newUser instance
        newUser.password = hashedPassword;

        // Save the new user to the database
        let user = await newUser.save();

        // Respond with a JSON containing a success message and user data (excluding the password)
        return res.json({ "message": "User Register Successfully", user: { username: user.username, /*password: user.password*/ } });
    }
    catch (err) {
        // If there's an error during registration, respond with a 400 Bad Request status and the error message
        return res.status(400).send({ message: err });
    }
};

// Function to handle user login
exports.login = async function (req, res) {
    try {
        // Find the user in the database based on the provided username
        let user = await userModel.findOne({ username: req.body.username });

        // If the user is not found or the password doesn't match, respond with a 401 Unauthorized status and an error message
        if (!user || !(user.comparePassword(req.body.password))) {
            return res.status(401).json({ "message": "Authentication Failed, Invalid username or password" });
        }

        // Generate a JSON Web Token (JWT) with the user's username and hashed password as the payload, and a secret "securityKey"
        const token = jwt.sign({ username: user.username, id: user._id }, "securityKey");

        // Respond with a JSON containing a success message indicating successful login and the user's data (excluding the password)
        return res.cookie('token', token).json({ message: "User Logged in Successfully", id: user._id, username: user.username, token: token });
    } catch (err) {
        // If there's an error during login, respond with a 400 Bad Request status and the error message
        return res.status(400).send({ message: err });
    }
};



exports.profile = async function (req, res) {
    try {
        const { token } = req.cookies
        jwt.verify(token, "securityKey", {}, (err, info) => {
            if (err) throw err
            res.json(info)
        })
    } catch (err) {
        return res.status(400).send({ message: err });
    }
}

exports.logout = async function (req, res) {
    try {
        res.cookie('token', '').json('ok')
    } catch (err) {
        return res.status(400).send({ message: err });
    }
}
