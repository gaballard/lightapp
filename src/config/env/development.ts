export default {
  app: {
    title: process.env.APP_TITLE || 'LightApp',
    description: process.env.APP_DESCRIPTION || 'Lightweight Application Framework - a scaffold for quickly creating robust, dependency-managed Node.js applications'
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  apis: 'core'    // comma-separated string of APIs to load
};