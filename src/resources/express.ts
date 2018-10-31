/**
 * Express Resource
 */

import * as Promise from 'bluebird';
import * as debug from 'debug';
import * as express from 'express';
import * as config from '../config';

const logger = debug('resources:express');

let server: any;

export const auto = () => {

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
};
