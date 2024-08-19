require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./User.js');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    });

    try {
        const savedUser = await user.save();
        console.log('User added successfully');
        res.status(201).send({ message: "User added successfully", user: savedUser });
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message || "An error occurred");
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            console.log('No users found');
            return res.status(404).json({ message: 'No users found' });
        }
        console.log(users);
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || "An error occurred");
    }
});

app.delete('/users/:email', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User deleted successfully');
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});