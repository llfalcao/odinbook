const mongoose = require('mongoose');

const mongoDb = process.env.MONGODB;
mongoose.connect(mongoDb);

const db = mongoose.connection;
db.on(
  'error',
  console.log.bind(console, 'MongoDB connection error.')
);
