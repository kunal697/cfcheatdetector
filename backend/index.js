const express = require('express');
const mongoose = require('mongoose');
const User = require('./UserSchema'); 
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Leaderboard');
});

app.get('/leader', async (req, res) => {
    try{
         const response = await User.find();
         res.status(200).send(response);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

app.post('/user', async (req, res) => {
    try {
        const { username } = req.body; // Destructure username from req.body
        if (!username) {
            return res.status(400).send('Username is required');
        }

        let user = await User.findOne({ username });
        if (user) {
            user.count += 1;
            await user.save();
            res.status(200).send('User count incremented');
        } else {
            const newUser = new User({ username, count: 1});
            await newUser.save();
            res.status(201).send('User created successfully');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error: ' + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening on 3000');
});
