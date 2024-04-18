require('dotenv').config();
const mongoose = require('mongoose');

let { MONGODB_URI } = process.env;
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI;
}

const db = () => {
  mongoose.connect(MONGODB_URI).then(
    console.log('Connected to MongoDB')
  ).catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  })
};

module.exports = db;
