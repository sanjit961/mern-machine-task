const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// MongoDB connection URL
const mongoURI = 'mongodb+srv://sanjit:b4Lq3MYORx1kfR4b@cluster0.ozowps1.mongodb.net'; // Ensure this is correct

// Create a connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFS stream
let gfs;
conn.once('open', () => {
  console.log('mongodb+srv://sanjit:b4Lq3MYORx1kfR4b@cluster0.ozowps1.mongodb.net/test333');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Ensure this collection is set correctly
});

// Create a storage engine with multer-gridfs-storage
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: `file-${Date.now()}-${file.originalname}`, // Define the filename pattern
        bucketName: 'uploads', // Bucket name in MongoDB
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

module.exports = { gfs, upload };
