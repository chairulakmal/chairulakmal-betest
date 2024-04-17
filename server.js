const express = require('express');

const app = express();
const db = require('./db');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Database
if (process.env.NODE_ENV !== 'test') db();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
