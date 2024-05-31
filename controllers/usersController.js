const axios = require('axios');

exports.getUsers = async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data.slice(0, 10));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const [userResponse, postsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      axios.get('https://jsonplaceholder.typicode.com/posts')
    ]);
    const user = userResponse.data;
    const posts = postsResponse.data.filter(post => post.userId == userId);
    res.json({ user, posts });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
