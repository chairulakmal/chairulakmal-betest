const app = require('../server');

afterAll(async () => {
  await app.close();
});
