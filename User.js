const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        default: 18
    }
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in other parts of the application
module.exports = User;
