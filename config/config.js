/**
 * App configuration
 */

module.exports = {
  app: {
    title: 'LightApp',
    description: 'Lightweight App Platform - A scaffold for creating Node.js applications'
  },
  port: process.env.PORT || 3000,
  apis: 'core'    // comma-separated string of APIs to load
};