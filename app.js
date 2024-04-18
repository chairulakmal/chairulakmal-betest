const express = require('express');
const initMongoDb = require('./db');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
initMongoDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test route
app.get('/', (_, res) => {
  res.send('App is running');
});

// Use router and error handler middleware
app.use(router);
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
