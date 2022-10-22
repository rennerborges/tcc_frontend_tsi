const withImages = require('next-images');
const createEnvFile = require('./config');

module.exports = withImages({
  webpack: (config) => {
    createEnvFile();
    return config;
  },
});
