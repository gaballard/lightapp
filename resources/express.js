/**
 * Express Resource
 */

import Promise from 'bluebird';
import debug from 'debug';
import express from 'express';
import config from '../config/config';

const logger = debug('resources:express');

var server;

function auto() {
  
  // Singleton instance
  if (server) {
    logger('Using existing Express server...');
    return new Promise(server);
  }
  
  return server = new Promise((resolve) => {
    logger('Creating Express server...');
    
    const app = express();
    
    // App settings
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    
    // Set HTTP Headers
    
    // Middleware goes here
    
    // Start server
    app.listen(config.port, () => {
      logger('Express server running on port: %s', config.port);
      resolve(app);
    });
  });
}

module.exports = auto;