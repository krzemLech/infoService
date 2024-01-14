const config = {
  port: process.env.PORT || 3000,
  db: process.env.MONGO_URI,
  keySession: process.env.KEY_SESSION,
  maxAgeSession: process.env.MAX_AGE_SESSION,
};

module.exports = config;
