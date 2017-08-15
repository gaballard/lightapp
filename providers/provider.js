/**
 * Provider
 */

import Promise from 'bluebird';
import debug from 'debug';

// eslint-disable-next-line no-unused-vars
const logger = debug('providers:provider');

// eslint-disable-next-line no-unused-vars
function auto(dependencies) {
  
  const api = {};
  
  return Promise.resolve(api);
}

module.exports = auto;