const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')


// create express app
const app = express();

app.use(cors());
app.use(bodyParser.json());

const data = require('./db.json');

app.get('/products', (req, res) => {
  res.json(data.products);
});


// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

app.listen(5000, () => {
  console.log('Server started on port 5000');
});