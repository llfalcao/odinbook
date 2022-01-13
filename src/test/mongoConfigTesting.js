const mongoose = require('mongoose');
const {
  MongoMemoryServer,
} = require('mongodb-memory-server');

async function initializeMongoServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);
  mongoose.connection.on('error', (err) => {
    console.log(err);
    if (err.message.code === 'ETIMEDOUT') {
      mongoose.connect(mongoUri);
    }
  });

  mongoose.connection.once('open', () => {
    console.log(
      `MongoDB successfully connected to ${mongoUri}`
    );
  });
}

module.exports = initializeMongoServer;
