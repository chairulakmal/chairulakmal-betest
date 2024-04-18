const { createClient } = require('redis');

const client = createClient({ url: process.env.REDIS_URL });

client.connect().finally(() => {
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
});

module.exports = client;
