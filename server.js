const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const data = require('./db.json');

// Get heatlh endpoint status
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

// Get a specific product
app.get('/api/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = data.products.find((p) => p.productId === productId);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.status(200).json(product);
  }
});

// Create a new product
app.post('/api/products', (req, res) => {
  const product = req.body;
  product.productId = data.products.length + 1;
  data.products.push(product);
  res.status(201).json(product);
});

// Update an existing product
app.put('/api/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const productIndex = data.products.findIndex((p) => p.productId === productId);
  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    const product = req.body;
    product.productId = productId;
    data.products[productIndex] = product;
    res.status(200).json(product);
  }
});

// Delete an existing product
app.delete('/api/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const productIndex = data.products.findIndex((p) => p.productId === productId);
  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    data.products.splice(productIndex, 1);
    res.status(204).send();
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});