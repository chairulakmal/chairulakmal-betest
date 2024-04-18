const { createClient } = require('redis');

function initRedisClient() {
  const url = process.env.REDIS_URI;
  if (url) {
    const client = createClient({ url });

    client.on('error', (error) => {
      console.error('Failed to create the Redis client with error:');
      console.error(error);
    });

    client.on('connect', () => {
      console.log('Connected to Redis successfully!');
    });

    client.on('end', () => {
      console.log('Redis connection closed.');
    });
  }
}

module.exports = initRedisClient;
