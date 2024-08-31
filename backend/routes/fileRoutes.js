const express = require('express');
const router = express.Router();
const { gfs } = require('../gridFsStorage'); // Adjust the path

// Fetch image by filename
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).send({ error: 'File not found' });
    }

    // Check if the file is an image
    if (file.contentType.startsWith('image/')) {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(400).send({ error: 'Not an image file' });
    }
  });
});

module.exports = router;
