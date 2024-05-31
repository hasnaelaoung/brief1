exports.uploadFile = (req, res) => {
    if (!req.file) {
      return res.status(400).send('File upload failed. Only JPEG and PNG files are allowed.');
    }
    res.status(201).send('File uploaded successfully');
  };
  