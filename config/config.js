/**
 * App configuration
 */

module.exports = {
  app: {
    title: 'LightApp',
    description: 'Lightweight Application Framework - a scaffold for quickly creating robust, dependency-managed Node.js applications'
  },
  port: process.env.PORT || 3000,
  apis: 'core'    // comma-separated string of APIs to load
};