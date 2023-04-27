const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('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');


const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://moonyejin333:ansdPwls%230308a@metaotakus.kpmicib.mongodb.net/MetaOtakus?retryWrites=true&w=majority';

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  const db = client.db('MetaOtakus');

  // You can now perform operations on the 'db' object, which is connected to your MongoDB Atlas database

  // Remove the line below since you want to keep the connection open for your application
  // client.close();
});

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, '../src')));


// Import routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Passport for authentication
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
