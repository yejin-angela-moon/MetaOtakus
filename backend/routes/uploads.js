const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10 MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.mp4') {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  },
}).single('file');

const Post = require('../models/Post');

router.post('/', upload, async (req, res) => { // Add the 'async' keyword
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }

  const filePath = 'uploads/' + file.filename;

  const post = new Post({
    user: req.user.id, // Use the user's ID from the request (assuming the user is authenticated)
    filePath: filePath,
  });

  await post.save(); // Now 'await' can be used here
  res.json({ message: 'File uploaded successfully', filePath: filePath });
});


module.exports = router;
