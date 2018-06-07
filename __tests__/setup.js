const MongodbMemoryServer = require('mongodb-memory-server').default;

const MONGO_DB_NAME = 'ping-pong-test';

module.exports = function() {
  global.__MONGOD__ = new MongodbMemoryServer({
    instance: {
      dbName: MONGO_DB_NAME,
    }
  });
  global.__MONGO_DB_NAME__ = MONGO_DB_NAME;
};