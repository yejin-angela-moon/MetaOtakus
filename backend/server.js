//Import required modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

//Define the MongoDB connection string
const uri = 'mongodb+srv://moonyejin333:ansdPwls%230308a@metaotakus.kpmicib.mongodb.net/MetaOtakus?retryWrites=true&w=majority';

//Connect to MongoDB using MongoClient
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

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));




//Initialize and configure the Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../src')));
app.use(bodyParser.urlencoded({ extended: false }));

//Serve static files (HTML) based on the requested path
app.get('*', (req, res, next) => {
  const filePath = path.join(__dirname, '../src', req.path + '.html');
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, pass the request to the next middleware (e.g., a 404 handler)
      return next();
    }
    // If the file exists, serve it
    res.sendFile(filePath);
  });
});

// Import and use users route
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Import and use new register route
const registerRoute = require('./routes/register');
app.use('/register', registerRoute);


// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



//Define routes for addcard and payment
app.get('/addcard', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/addcard.html'));
});
app.post('/addcard/submit', (req, res) => {
  // Handle the form data here (e.g., save it to the database)
  console.log(req.body);
  // Redirect to the payment.html page
  res.redirect('/payment');
});
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/payment.html'));
});



// Configure passport for authentication
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
