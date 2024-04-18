require('./app');
const mongoose = require('mongoose');

// Gracefully shut down the application
const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  } finally {
    // Close server
    process.exit(0);
  }
};

// Perform graceful shutdown on exits
process.on('SIGINT', gracefulShutdown);

process.on('uncaughtException', async (err) => {
  console.error('Uncaught exception:', err);
  await gracefulShutdown();
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  await gracefulShutdown();
});
