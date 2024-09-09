const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Grid = require('gridfs-stream')
const { upload, gfs } = require('../gridFsStorage'); // Ensure gfs is correctly initialized


// Create a new user with an image upload
router.post('/users', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobileNumber, gender, course, designation } = req.body;
    console.log("req.body", req.body);
    if (!name || !email || !mobileNumber || !gender || !course || !designation) {
      return res.status(400).send({ error: 'All fields except image are required' });
    }

    let image = null;
    if (req.file) {
      image = req.file.filename; // Store the GridFS filename
    }

    const user = new User({
      name,
      email,
      mobileNumber,
      gender,
      course,
      designation,
      image,
    });

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID (including image upload)
router.put('/users/:id', upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    const { name, email, mobileNumber, gender, course, designation } = req.body;
   

    if (req.file) {
      const oldImageFilename = user.image;
      if (oldImageFilename) {
        // Remove old image from GridFS
        gfs?.remove({ filename: oldImageFilename, root: 'uploads' }, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      user.image = req.file.filename; // Set new image filename
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.gender = gender || user.gender;
    user.course = course || user.course;
    user.designation = designation || user.designation;

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
