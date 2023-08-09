// Import required modules
const mongoose = require("mongoose"); // Mongoose for MongoDB interactions
const bcrypt = require("bcrypt"); // bcrypt for password hashing
const Schema = mongoose.Schema; // Create a reference to the Mongoose Schema class

// Define the userSchema with the required fields
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Define a method called 'comparePassword' on the userSchema
userSchema.methods.comparePassword = async function (password) {
    try {
        // Use bcrypt.compare() to securely compare the provided 'password' parameter
        // with the hashed password stored in the user document (retrieved using 'this.password')
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        // If an error occurs during the password comparison, it is caught in a try-catch block, and the error is thrown.
        throw err;
    }
};

// Export the Mongoose model using the userSchema
module.exports = mongoose.model('Users', userSchema);
