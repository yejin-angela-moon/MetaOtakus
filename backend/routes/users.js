

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Define your users route here, using router.get(), router.post(), etc.

module.exports = router;


router.put('/profile', passport.authenticate('local', { session: false }), async (req, res) => {
    try {
      const { name } = req.body;
  
      // Update user name
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { name },
        { new: true }
      );
  
      // Send a successful response
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  const Post = require('../models/Post');

  // Add a route to get the user's posts
  router.get('/user-posts', async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); // Fetch posts for the authenticated user
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  

