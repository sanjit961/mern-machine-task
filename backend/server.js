const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const fs = require('fs'); // For file system operations
const User = require('./models/User'); // Ensure the correct path to the User model

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve the uploads directory statically

// MongoDB URI
const mongoURI = 'mongodb+srv://sanjit:b4Lq3MYORx1kfR4b@cluster0.ozowps1.mongodb.net/test555';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp and original filename
  }
});

const upload = multer({ storage });

// Routes

const router = express.Router();

// Create a new user with an image upload
router.post('/users', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobileNumber, gender, course, designation } = req.body;

    if (!name || !email || !mobileNumber || !gender || !course || !designation) {
      return res.status(400).send({ error: 'All fields except image are required' });
    }

    let image = null;
    if (req.file) {
        image = req.file.filename;
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
        // Remove old image from local storage
        fs.unlink(oldImageFilename, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      user.image = req.file.filename; // Set new image path
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
    console.log("user", user);
    if (!user) return res.status(404).send('User not found');

    // Remove image from local storage if it exists
    if (user.image) {
      fs.unlink(user.image, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Serve uploaded images
router.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath);
});

app.use('/api', router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
