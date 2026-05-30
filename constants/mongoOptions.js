/**
 * Shared Mongoose driver options (server + seed scripts).
 */
const MONGO_OPTIONS = {
  serverSelectionTimeoutMS: 15_000,
  maxPoolSize: 10,
};

module.exports = { MONGO_OPTIONS };
