/**
 * Application-level constants (non-secret).
 * Secrets stay in environment variables only.
 */
const DEFAULT_PORT = 5000;

const CLIENT_ORIGINS = (
  process.env.CLIENT_ORIGINS || 'http://localhost:5173'
).split(',').map((s) => s.trim()).filter(Boolean);

module.exports = {
  DEFAULT_PORT,
  CLIENT_ORIGINS,
};
