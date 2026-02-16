const { version } = require('./package.json');

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
};
