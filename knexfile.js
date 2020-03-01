// Update with your config settings.
const config = require('./config.json')

module.exports = {
  development: config.db,
  production: config.db
};
