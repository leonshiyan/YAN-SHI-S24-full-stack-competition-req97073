const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const data = require('./db.json');

app.get('/posts', (req, res) => {
  res.json(data.posts);
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});