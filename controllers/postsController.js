const axios = require('axios');
const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '..', 'data.json');

exports.createPosts = async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data.slice(0, 10);
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(posts, null, 2));
    res.status(201).send('Posts saved to data.json');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPosts = (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH);
    const posts = JSON.parse(data);
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPostById = (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  try {
    const data = fs.readFileSync(DATA_FILE_PATH);
    const posts = JSON.parse(data);
    const post = posts.find(p => p.id === postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
