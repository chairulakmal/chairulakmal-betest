const express = require('express');
const userRoutes = require('./routes/userRoutes')

const app = express();
const db = require('./db');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Database
db();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
