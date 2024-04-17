const app = require('../app');
const mongoose = require('mongoose');

// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongo;

// beforeAll(async () => {
//   // create an instance of MongoDB In-Memory Server
//   mongo = await MongoMemoryServer.create();

//   // URI of that instance, which can then be used to connect to the MongoDB server
//   const mongoUri = mongo.getUri();

//   // connecting to In-Memory MongoDB Server
//   await mongoose.connect(mongoUri, {});
// });

// // clean data before every test
// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (const collection of collections) {
//     await collection.deleteMany({});
//   }
// });

afterAll(async () => {
  // if (mongo) await mongo.stop();

  await mongoose.connection.close();
  app.close();
});
