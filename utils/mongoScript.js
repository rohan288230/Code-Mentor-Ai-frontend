const mongoose = require('mongoose');
const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1']); // Fix DNS issues for seed scripts
const { MONGO_OPTIONS } = require('../constants/mongoOptions');

function assertMongoUri() {
  if (!process.env.MONGO_URI || !String(process.env.MONGO_URI).trim()) {
    throw new Error(
      'MONGO_URI is not set. Create server/.env from server/.env.example and add your Atlas connection string.'
    );
  }
}

/**
 * Connect for standalone scripts (seed). Uses the same options as the API.
 */
async function connectMongoForScript() {
  assertMongoUri();
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  return mongoose.connect(process.env.MONGO_URI, MONGO_OPTIONS);
}

async function disconnectMongo() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

module.exports = { assertMongoUri, connectMongoForScript, disconnectMongo };
