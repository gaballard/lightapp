/**
 * Core API
 */

import Promise from 'bluebird';
import debug from 'debug';

const logger = debug('apis:core');

function auto(dependencies) {
  const { server } = dependencies.resources;
  
  // Routes, etc, go here
  server.get('/', (req, res) => {
    logger('GET /');
    res.status(200).json({
      status: 'OK',
    });
  });
  
  return Promise.resolve(server);
}

module.exports = auto;