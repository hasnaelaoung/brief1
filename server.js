const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const fileRoutes = require('./routes/files');

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/files', fileRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
