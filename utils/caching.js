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

const invalidateAll = async (id, user) => {
  // eslint-disable-next-line no-underscore-dangle
  if (id) await client.HDEL('user:id', id);
  if (user.accountNumber) await client.HDEL('user:accountNumber', user.accountNumber);
  if (user.identityNumber) await client.HDEL('user:identityNumber', user.identityNumber);
};

module.exports = {
  client, invalidateAll,
};
