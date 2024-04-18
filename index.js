require('./app');
const mongoose = require('mongoose');
const { client } = require('./utils/caching');

// Gracefully shut down the application
const gracefulShutdown = async () => {
  try {
    await client.quit();
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  } finally {
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
