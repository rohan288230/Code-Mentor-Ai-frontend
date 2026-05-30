const path = require('path');
const dotenv = require('dotenv');

/**
 * Load environment variables from `server/.env` (single source for API + seeds).
 * Safe to require multiple times (dotenv does not override existing vars).
 */
function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env');
  dotenv.config({ path: envPath });
}

loadEnv();

module.exports = { loadEnv };
