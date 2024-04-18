const app = require('../app');
const mongoose = require('mongoose');
const { client } = require('../utils/caching');

// Function to drop the database
const dropDatabase = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
  } catch (error) {
    console.error('Error dropping database:', error);
  } finally {
    mongoose.connection.close();
  }
};

afterAll(async () => {
  // Call the function to drop the test database after test
  await client.quit()
  dropDatabase();
  app.close();
});
