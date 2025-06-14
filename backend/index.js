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

// GET /leader?page=1&limit=10&search=kunal
app.get('/leader', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';
      const regex = new RegExp(search, 'i'); // Case-insensitive
  
      const skip = (page - 1) * limit;
  
      const totalCount = await User.countDocuments({ username: regex });
      const data = await User.find({ username: regex })
        .sort({ count: -1 })
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        data,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/leader/summary', async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      
      const aggregation = await User.aggregate([
        {
          $group: {
            _id: null,
            totalSearches: { $sum: "$count" }
          }
        }
      ]);
  
      res.status(200).json({
        totalUsers,
        totalSearches: aggregation[0]?.totalSearches || 0
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
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
