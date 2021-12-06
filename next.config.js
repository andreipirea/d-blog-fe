const path = require('path');

module.exports = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};